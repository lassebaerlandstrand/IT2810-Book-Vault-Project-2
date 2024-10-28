import { GraphQLScalarType, Kind } from 'graphql';
import db from './db/connection.js';
import { Document } from 'mongodb';
import { mongoCalculateAverageRatingAggregationPipeline } from './db/queries.js';

enum SortBy {
  Book = 'bookName',
  Author = 'authorName',
  Publisher = 'publisherName',
}

enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

interface SortInput {
  sortBy: SortBy;
  sortOrder: SortOrder;
}

interface BooksQueryArgs {
  search?: string;
  limit?: number;
  offset?: number;
  sortInput?: SortInput;
  beforeDate?: Date;
  afterDate?: Date;
  authors?: string[];
  genres?: string[];
  publishers?: string[];
  minPages?: number;
  maxPages?: number;
  minRating?: number;
}

const mapCounts = (counts: Document, keyName: string, valueName = 'count') =>
  Object.entries(counts).map(([key, value]) => ({
    [keyName]: key,
    [valueName]: value,
  }));

interface BookQueryArgs {
  id: string;
}

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description:
      "A Date can be a string in the format 'YYYY-MM-DD' or a number representing the milliseconds since the Unix epoch (1970-01-01T00:00:00Z)",
    parseValue(value: string | number) {
      return new Date(value);
    },
    serialize(value: string) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING && ast.value.match(/^\d+$/)) {
        return new Date(Number.parseInt(ast.value));
      }
      if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),

  Query: {
    async books(
      _,
      {
        search,
        limit = 10,
        offset = 0,
        sortInput,
        beforeDate,
        afterDate,
        authors,
        genres,
        publishers,
        minPages,
        maxPages,
        minRating,
      }: BooksQueryArgs,
    ) {
      const collection = db.collection('books');

      interface MongoBookFilters {
        $or?: { [key: string]: { $regex: RegExp } }[];
        publishDate?: { $lt?: Date; $gt?: Date };
        authors?: { $in: string[] };
        genres?: { $in: string[] };
        publisher?: { $in: string[] };
        pages?: { $gte?: number; $lte?: number };
        averageRating?: { $gte?: number };
      }

      const filters: MongoBookFilters = {};
      if (search) {
        // Does a case-insensitive search on the title and description fields
        const searchRegexSubString = new RegExp(search, 'i');
        const searchRegexWholeWords = new RegExp(`\\b${search}\\b`, 'i');
        filters.$or = [
          { title: { $regex: searchRegexSubString } },
          { description: { $regex: searchRegexWholeWords } },
        ];
      }
      if (beforeDate && afterDate) {
        filters.publishDate = {
          $lt: beforeDate,
          $gt: afterDate,
        };
      } else if (beforeDate) {
        filters.publishDate = { $lt: beforeDate };
      } else if (afterDate) {
        filters.publishDate = { $gt: afterDate };
      }
      if (authors && authors.length > 0) {
        filters.authors = { $in: authors };
      }
      if (genres && genres.length > 0) {
        filters.genres = { $in: genres };
      }
      if (publishers && publishers.length > 0) {
        filters.publisher = { $in: publishers };
      }
      if (minPages && maxPages) {
        filters.pages = { $gte: minPages, $lte: maxPages };
      } else if (minPages) {
        filters.pages = { $gte: minPages };
      } else if (maxPages) {
        filters.pages = { $lte: maxPages };
      }

      let filterAggregations: Document[] = [
        { $match: filters },
        ...mongoCalculateAverageRatingAggregationPipeline,
        {
          $addFields: {
            roundedAverageRating: { $round: ['$averageRating', 0] },
          },
        },
      ];
      if (minRating) {
        filterAggregations.push({
          $match: {
            roundedAverageRating: { $gte: minRating },
          },
        });
      }

      const pipeline: Document[] = [...filterAggregations];

      if (sortInput) {
        const sortOrder = sortInput.sortOrder == SortOrder.Ascending ? 1 : -1;
        switch (sortInput.sortBy) {
          case SortBy.Book:
            pipeline.push({
              $sort: { title: sortOrder, _id: 1 }, // Secondary sort by _id to ensure consistent ordering
            });
            break;
          case SortBy.Author:
            pipeline.push({
              $sort: { 'authors.0': sortOrder, _id: 1 },
            });
            break;
          case SortBy.Publisher:
            pipeline.push({
              $sort: { publisher: sortOrder, _id: 1 },
            });
            break;
        }
      }

      const filteredBooks = await collection.aggregate(pipeline).toArray();

      const totalBooks = filteredBooks.length;
      const totalPages = Math.ceil(totalBooks / limit);
      const currentPage = Math.floor(offset / limit) + 1;
      const isLastPage = currentPage >= totalPages;
      const skip = offset * limit;

      const books = filteredBooks.slice(skip, skip + limit);

      return {
        books,
        pagination: {
          totalPages,
          currentPage,
          isLastPage,
        },
        summary: {
          totalBooks,
        },
        filterCounts: {
          books: filteredBooks,
        },
      };
    },

    async authors() {
      return (await db.collection('books').distinct('authors')).map((author) => ({ name: author }));
    },

    async book(_, { id }: BookQueryArgs) {
      return await db.collection('books').findOne({ id: id });
    },

    async genres() {
      return (await db.collection('books').distinct('genres')).map((genre) => ({
        name: genre,
      }));
    },

    async publishers() {
      return (await db.collection('books').distinct('publisher')).map((publisher) => ({
        name: publisher,
      }));
    },
  },

  Book: {
    authors: async (book: { authors: string[] }) => {
      return book.authors.map((author) => ({ name: author }));
    },
    genres: async (book: { genres: string[] }) => {
      return book.genres.map((genre) => ({ name: genre }));
    },
    publisher: async (book: { publisher: string }) => {
      return { name: book.publisher };
    },
    numRatings: async (book: { ratingsByStars: { [x: number]: number } }) => {
      return Object.values(book.ratingsByStars).reduce((total, count) => total + count, 0);
    },
    rating: async (book: { ratingsByStars: { [x: number]: number } }) => {
      const numRatings = Object.values(book.ratingsByStars).reduce(
        (total, count) => total + count,
        0,
      );

      if (numRatings === 0) {
        return 0;
      }

      const weightedSum = Object.entries(book.ratingsByStars).reduce((sum, [key, count]) => {
        return sum + parseInt(key, 10) * count;
      }, 0);

      return weightedSum / numRatings;
    },
  },
  FilterCountResult: {
    authors: async (filterCounts: { books: Document[] }) => {
      const authorCounts = filterCounts.books.reduce((acc, book) => {
        book.authors.forEach((author: string) => {
          acc[author] = (acc[author] || 0) + 1;
        });
        return acc;
      }, {});
      return mapCounts(authorCounts, 'name');
    },

    genres: async (filterCounts: { books: Document[] }) => {
      const genreCounts = filterCounts.books.reduce((acc, book) => {
        book.genres.forEach((genre) => {
          acc[genre] = (acc[genre] || 0) + 1;
        });
        return acc;
      }, {});
      return mapCounts(genreCounts, 'name');
    },

    publishers: async (filterCounts: { books: Document[] }) => {
      const publisherCounts = filterCounts.books.reduce((acc, book) => {
        acc[book.publisher] = (acc[book.publisher] || 0) + 1;
        return acc;
      }, {});
      return mapCounts(publisherCounts, 'name');
    },

    publishDates: async (filterCounts: { books: Document[] }) => {
      const publishDateCounts = filterCounts.books.reduce((acc, book) => {
        const year = book.publishDate.getFullYear();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
      }, {});
      return mapCounts(publishDateCounts, 'year');
    },

    pages: async (filterCounts: { books: Document[] }) => {
      const pageCounts = filterCounts.books.reduce((acc, book) => {
        acc[book.pages] = (acc[book.pages] || 0) + 1;
        return acc;
      }, {});
      return mapCounts(pageCounts, 'pages');
    },

    ratings: async (filterCounts: { books: Document[] }) => {
      const ratingCounts = filterCounts.books.reduce((acc, book) => {
        acc[book.roundedAverageRating] = (acc[book.roundedAverageRating] || 0) + 1;
        return acc;
      }, {});
      return mapCounts(ratingCounts, 'ratings');
    },
  },
};

export default resolvers;
