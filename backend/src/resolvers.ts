import { GraphQLScalarType, Kind } from 'graphql';
import db from './db/connection.js';
import { Document } from 'mongodb';
import { mongoCalculateAverageRatingAggregationPipeline } from './db/queries.js';

export enum SortBy {
  Book = 'bookName',
  Author = 'authorName',
  Publisher = 'publisherName',
}

export enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

interface SortInput {
  sortBy: SortBy;
  sortOrder: SortOrder;
}

interface FilterInput {
  search?: string;
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

interface FilterCountInput {
  input?: FilterInput;
}

interface BooksQueryArgs {
  input?: FilterInput;
  sortInput?: SortInput;
  offset: number;
  limit: number;
}

interface BookQueryArgs {
  id: string;
}

interface MongoBookFilters {
  $or?: { [key: string]: { $regex: RegExp } }[];
  publishDate?: { $lt?: Date; $gt?: Date };
  authors?: { $in: string[] };
  genres?: { $in: string[] };
  publisher?: { $in: string[] };
  pages?: { $gte?: number; $lte?: number };
  averageRating?: { $gte?: number };
}

const mapCounts = (counts: Document, keyName: string, valueName = 'count') =>
  Object.entries(counts).map(([key, value]) => ({
    [keyName]: key,
    [valueName]: value,
  }));

const filterBooks = async (input: FilterInput) => {
  const basePipeline: Document[] = buildPipelineWithoutSpecificFilters(input);
  const baseBooks = await db.collection('books').aggregate(basePipeline).toArray();

  const exclusionDictionaries: {
    genresExcluded?: Document[];
    minRatingExcluded?: Document[];
    allExcluded?: Document[];
    // Add other exclusions as needed
  } = {};

  const applyExclusionFilter = (excludeFilter: null | keyof FilterInput) => {
    if (!exclusionDictionaries[`${excludeFilter ?? 'all'}Excluded`]) {
      exclusionDictionaries[`${excludeFilter ?? 'all'}Excluded`] = baseBooks.filter((book) => {
        const meetsCriteria = {
          genres:
            excludeFilter === 'genres' ||
            !input.genres ||
            input.genres.length === 0 ||
            input.genres.some((genre) => book.genres.includes(genre)),
          minRating:
            excludeFilter === 'minRating' ||
            !input.minRating ||
            book.roundedAverageRating >= input.minRating,
          // Add any future filters here in the same pattern
        };

        return Object.values(meetsCriteria).every(Boolean);
      });
    }
    return exclusionDictionaries[`${excludeFilter ?? 'all'}Excluded`];
  };

  applyExclusionFilter('genres');
  applyExclusionFilter('minRating');
  applyExclusionFilter(null);

  return {
    exclusionDictionaries,
  };
};

const buildPipelineWithoutSpecificFilters = ({
  search,
  sortInput,
  beforeDate,
  afterDate,
  authors,
  publishers,
  minPages,
  maxPages,
}: FilterInput) => {
  const filters: MongoBookFilters = {};

  if (search) {
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

  const pipeline: Document[] = [{ $match: filters }];

  pipeline.push(
    ...mongoCalculateAverageRatingAggregationPipeline,
    {
      $addFields: {
        roundedAverageRating: { $round: ['$averageRating', 0] },
      },
    },
  );

  if (sortInput) {
    const sortOrder = sortInput.sortOrder === SortOrder.Ascending ? 1 : -1;
    switch (sortInput.sortBy) {
      case SortBy.Book:
        pipeline.push({
          $sort: { title: sortOrder, _id: 1 },
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

  return pipeline;
};

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
    async books(_, args: BooksQueryArgs) {
      const filteredBooks = (await filterBooks(args.input ?? {})).exclusionDictionaries.allExcluded;

      const totalBooks = filteredBooks.length;
      const skip = args.offset * args.limit;
      const books = filteredBooks.slice(skip, skip + args.limit);

      return {
        books,
        summary: {
          totalBooks,
        },
      };
    },

    async filterCount(_, args: FilterCountInput) {
      const { exclusionDictionaries } = await filterBooks(args.input ?? {});
      return {
        books: exclusionDictionaries.allExcluded ?? [],
        minRatingBooks: exclusionDictionaries.minRatingExcluded ?? [],
        genresBooks: exclusionDictionaries.genresExcluded ?? [],
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

    async dateSpan() {
      const minDate = await db.collection('books').find().sort({ publishDate: 1 }).limit(1).next();
      const maxDate = await db.collection('books').find().sort({ publishDate: -1 }).limit(1).next();
      return {
        earliest: minDate?.publishDate,
        latest: maxDate?.publishDate,
      };
    },

    async pageSpan() {
      const minPages = await db.collection('books').find().sort({ pages: 1 }).limit(1).next();
      const maxPages = await db.collection('books').find().sort({ pages: -1 }).limit(1).next();
      return {
        least: minPages?.pages,
        most: maxPages?.pages,
      };
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

    genres: async (filterCounts: { genresBooks: Document[] }) => {
      const genreCounts = filterCounts.genresBooks.reduce((acc, book) => {
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

    ratings: async (filterCounts: { minRatingBooks: Document[] }) => {
      const ratingCounts = filterCounts.minRatingBooks.reduce((acc, book) => {
        Object.entries(book.ratingsByStars).forEach(([rating, count]) => {
          if (rating <= book.roundedAverageRating) acc[rating] = (acc[rating] || 0) + 1;
        });
        return acc;
      }, {});
      return mapCounts(ratingCounts, 'rating');
    },
  },
};

export default resolvers;
