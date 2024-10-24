import { GraphQLScalarType, Kind } from 'graphql';
import db from './db/connection.js';
import { Document } from 'mongodb';
import { mongoCalculateAverageRatingAggregationPipeline } from './db/queries.js';

interface OrderByInput {
  bookName?: 'asc' | 'desc';
  authorName?: 'asc' | 'desc';
  publisherName?: 'asc' | 'desc';
}

interface BooksQueryArgs {
  search?: string;
  limit?: number;
  offset?: number;
  orderBy?: OrderByInput;
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
        orderBy,
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
        $text?: { $search: string };
        publishDate?: { $lt?: Date; $gt?: Date };
        authors?: { $in: string[] };
        genres?: { $in: string[] };
        publisher?: { $in: string[] };
        pages?: { $gte?: number; $lte?: number };
        averageRating?: { $gte?: number };
      }

      const filters: MongoBookFilters = {};
      if (search) {
        filters.$text = { $search: search };
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
      if (authors) {
        filters.authors = { $in: authors };
      }
      if (genres) {
        filters.genres = { $in: genres };
      }
      if (publishers) {
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

      if (orderBy) {
        if (orderBy.bookName) {
          pipeline.push({
            $sort: { title: orderBy.bookName === 'asc' ? 1 : -1 },
          });
        } else if (orderBy.authorName) {
          pipeline.push({
            $sort: { 'authors.0': orderBy.authorName === 'asc' ? 1 : -1 },
          });
        } else if (orderBy.publisherName) {
          pipeline.push({
            $sort: { publisher: orderBy.publisherName === 'asc' ? 1 : -1 },
          });
        }
      }

      const filteredBooks = await collection.aggregate(pipeline).toArray();

      const totalBooks = filteredBooks.length;
      const totalPages = Math.ceil(totalBooks / limit);
      const currentPage = Math.floor(offset / limit) + 1;
      const isLastPage = currentPage >= totalPages;
      const skip = offset * limit;

      const books = filteredBooks.slice(skip, skip + limit);

      const authorCounts = filteredBooks.reduce((acc, book) => {
        book.authors.forEach((author: string) => {
          acc[author] = (acc[author] || 0) + 1;
        });
        return acc;
      }, {});

      const genreCounts = filteredBooks.reduce((acc, book) => {
        book.genres.forEach((genre: string) => {
          acc[genre] = (acc[genre] || 0) + 1;
        });
        return acc;
      }, {});

      const publisherCounts = filteredBooks.reduce((acc, book) => {
        acc[book.publisher] = (acc[book.publisher] || 0) + 1;
        return acc;
      }, {});

      const publishDateCounts = filteredBooks.reduce((acc, book) => {
        const year = book.publishDate.getFullYear();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
      }, {});

      const pageCounts = filteredBooks.reduce((acc, book) => {
        acc[book.pages] = (acc[book.pages] || 0) + 1;
        return acc;
      }, {});

      const ratingCounts = filteredBooks.reduce((acc, book) => {
        acc[book.roundedAverageRating] = (acc[book.roundedAverageRating] || 0) + 1;
        return acc;
      }, {});

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
          authors: mapCounts(authorCounts, 'name'),
          genres: mapCounts(genreCounts, 'name'),
          publishers: mapCounts(publisherCounts, 'name'),
          publishDates: mapCounts(publishDateCounts, 'year'),
          pages: mapCounts(pageCounts, 'pages'),
          ratings: mapCounts(ratingCounts, 'rating'),
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
};

export default resolvers;
