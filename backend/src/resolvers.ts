import { GraphQLScalarType, Kind } from 'graphql';
import db from './db/connection.js';
import { Document } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
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

interface UserQueryArgs {
  UUID: string;
}

interface BookReviewsQueryArgs {
  bookID: string;
  limit: number;
  offset: number;
  avoidUserUUID: string;
  focusUserUUID: string;
}

interface SingleBookReviewQueryArgs {
  bookID: string;
  userUUID: string;
}

interface BookReviewMutationArgs {
  userUUID: string;
  bookID: string;
  description: string;
  rating: number;
}

interface UpdateBookReviewMutationArgs {
  reviewUUID: string;
  description: string;
  rating: number;
}

interface UserQueryArgs {
  UUID: string;
}

interface BookReviewsQueryArgs {
  bookID: string;
  limit: number;
  offset: number;
  avoidUserUUID: string;
  focusUserUUID: string;
}

interface SingleBookReviewQueryArgs {
  bookID: string;
  userUUID: string;
}

interface BookReviewMutationArgs {
  userUUID: string;
  bookID: string;
  description: string;
  rating: number;
}

interface UpdateBookReviewMutationArgs {
  reviewUUID: string;
  description: string;
  rating: number;
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

    async user(_, { UUID }: UserQueryArgs) {
      return await db.collection('users').findOne({ UUID: UUID });
    },

    async bookReviews(
      _,
      { bookID, limit, offset, avoidUserUUID, focusUserUUID }: BookReviewsQueryArgs,
    ) {
      if (avoidUserUUID && bookID) {
        const total = await db
          .collection('reviews')
          .countDocuments({ bookID: bookID, userUUID: { $ne: avoidUserUUID } });

        const totalPages = Math.ceil(total / limit);
        const currentPage = offset + 1;
        const isLastPage = currentPage >= totalPages;
        const skip = offset * limit;

        const reviews = await db
          .collection('reviews')
          .aggregate([
            { $match: { bookID: bookID, userUUID: { $ne: avoidUserUUID } } },
            { $sort: { at: -1 } },
            { $skip: skip },
            { $limit: limit },
          ])
          .toArray();

        const book = await db.collection('books').findOne({ id: bookID });

        const finishedReviews = [];
        for (let i = 0; i < reviews.length; i++) {
          const review = reviews[i];
          const user = await db.collection('users').findOne({ UUID: review.userUUID });

          finishedReviews.push({
            UUID: review.UUID,
            description: review.description,
            rating: review.rating,
            at: new Date(review.at),
            user: user,
            book: book,
          });
        }

        return {
          reviews: finishedReviews,
          pagination: {
            totalPages,
            currentPage,
            isLastPage,
          },
          summary: {
            total,
          },
        };
      }

      if (focusUserUUID) {
        const total = await db.collection('reviews').countDocuments({ userUUID: focusUserUUID });

        const totalPages = Math.ceil(total / limit);
        const currentPage = offset + 1;
        const isLastPage = currentPage >= totalPages;
        const skip = offset * limit;

        const reviews = await db
          .collection('reviews')
          .aggregate([
            { $match: { userUUID: focusUserUUID } },
            { $sort: { at: -1 } },
            { $skip: skip },
            { $limit: limit },
          ])
          .toArray();

        const user = await db.collection('users').findOne({ UUID: focusUserUUID });

        const finishedReviews = [];
        for (let i = 0; i < reviews.length; i++) {
          const review = reviews[i];
          const book = await db.collection('books').findOne({ id: review.bookID });

          finishedReviews.push({
            UUID: review.UUID,
            description: review.description,
            rating: review.rating,
            at: new Date(review.at),
            book: book,
            user: user,
          });
        }

        return {
          reviews: finishedReviews,
          pagination: {
            totalPages,
            currentPage,
            isLastPage,
          },
          summary: {
            total,
          },
        };
      }

      const total = await db.collection('reviews').countDocuments();

      const totalPages = Math.ceil(total / limit);
      const currentPage = offset + 1;
      const isLastPage = currentPage >= totalPages;
      const skip = offset * limit;

      const reviews = await db
        .collection('reviews')
        .aggregate([{ $sort: { at: -1 } }, { $skip: skip }, { $limit: limit }])
        .toArray();

      const finishedReviews = [];
      for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];
        const user = await db.collection('users').findOne({ UUID: review.userUUID });
        const book = await db.collection('books').findOne({ id: review.bookID });

        finishedReviews.push({
          UUID: review.UUID,
          description: review.description,
          rating: review.rating,
          at: new Date(review.at),
          book: book,
          user: user,
        });
      }

      return {
        reviews: finishedReviews,
        pagination: {
          totalPages,
          currentPage,
          isLastPage,
        },
        summary: {
          total,
        },
      };
    },

    async bookReview(_, { bookID, userUUID }: SingleBookReviewQueryArgs) {
      const review = await db.collection('reviews').findOne({ bookID: bookID, userUUID: userUUID });

      return {
        UUID: review.UUID,
        description: review.description,
        rating: review.rating,
        at: new Date(review.at),
      };
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

    async stats() {
      return {}; // Uses the resolver in Stats, this makes it so if a field is not requested, then it is not calculated
    },

    async randomBook() {
      const randomBook = await db
        .collection('books')
        .aggregate([{ $sample: { size: 1 } }])
        .toArray();
      return randomBook[0] || null;
    },
  },

  Stats: {
    totalBooks: async () => {
      return await db.collection('books').countDocuments();
    },
    totalAuthors: async () => {
      return (await db.collection('books').distinct('publisher')).length;
    },
    totalRatings: async () => {
      const totalRatings = await db
        .collection('books')
        .aggregate([
          {
            $group: {
              _id: null,
              totalRatings: {
                $sum: {
                  $add: [
                    '$ratingsByStars.1',
                    '$ratingsByStars.2',
                    '$ratingsByStars.3',
                    '$ratingsByStars.4',
                    '$ratingsByStars.5',
                  ],
                },
              },
            },
          },
        ])
        .toArray();

      return totalRatings[0]?.totalRatings || 0;
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
        Array.from({ length: 6 }, (_, i) => i).forEach((rating) => {
          if (rating <= book.roundedAverageRating) acc[rating] = (acc[rating] || 0) + 1;
        });
        return acc;
      }, {});
      return mapCounts(ratingCounts, 'rating');
    },
  },

  Mutation: {
    async createUser() {
      const collection = db.collection('users');

      const randomAdjective = await db
        .collection('adjectives')
        .aggregate([{ $sample: { size: 1 } }])
        .toArray();

      const randomNoun = await db
        .collection('nouns')
        .aggregate([{ $sample: { size: 1 } }])
        .toArray();

      const randomName = randomAdjective[0].word + ' ' + randomNoun[0].word;

      const newUser = {
        UUID: uuidv4(),
        name: randomName,
        at: new Date(),
        wantToRead: [],
        haveRead: [],
      };

      await collection.insertOne(newUser);
      return newUser; // Return the created user
    },

    async createReview(_, { input }: { input: BookReviewMutationArgs }) {
      const { userUUID, bookID, description, rating } = input;

      const newReview = {
        UUID: uuidv4(),
        description: description,
        rating: rating,
        at: new Date(),
        userUUID: userUUID,
        bookID: bookID,
      };

      await db.collection('reviews').insertOne(newReview);

      const incKey = rating.toString();

      const result = await db.collection('books').findOneAndUpdate(
        { id: bookID },
        {
          $inc: {
            [`ratingsByStars.${incKey}`]: 1,
          },
        },
        {
          returnDocument: 'after',
        },
      );

      const updatedBook = result.value;

      const numRatings = Object.values(updatedBook.ratingsByStars).reduce(
        (total: number, count: number) => total + count,
        0,
      ) as number;

      // I dont think it is possible for numRatings to be 0 after incrementation, but
      // its a nice failsafe
      if (numRatings === 0) {
        return 0;
      }

      const weightedSum = Object.entries(updatedBook.ratingsByStars).reduce(
        (sum, [key, count]: [string, number]) => {
          return sum + parseInt(key, 10) * count;
        },
        0,
      );

      return { rating: weightedSum / numRatings };
    },

    async updateReview(_, { input }: { input: UpdateBookReviewMutationArgs }) {
      const { reviewUUID, description, rating } = input;

      const oldReview = await db.collection('reviews').findOneAndUpdate(
        { UUID: reviewUUID },
        {
          $set: {
            description: description,
            rating: rating,
          },
        },
        {
          returnDocument: 'before',
        },
      );

      if (rating != oldReview.value.rating) {
        const incKey = rating.toString(); // Increment new rating
        const decKey = oldReview.value.rating.toString(); // Decrement old one

        const result = await db.collection('books').findOneAndUpdate(
          { id: oldReview.value.bookID },
          {
            $inc: {
              [`ratingsByStars.${incKey}`]: 1,
              [`ratingsByStars.${decKey}`]: -1,
            },
          },
          {
            returnDocument: 'after',
          },
        );

        const updatedBook = result.value;

        const numRatings = Object.values(updatedBook.ratingsByStars).reduce(
          (total: number, count: number) => total + count,
          0,
        ) as number;

        if (numRatings === 0) {
          return 0;
        }

        const weightedSum = Object.entries(updatedBook.ratingsByStars).reduce(
          (sum, [key, count]: [string, number]) => {
            return sum + parseInt(key, 10) * count;
          },
          0,
        );
        return { rating: weightedSum / numRatings };
      }
      return;
    },
  },
};

export default resolvers;
