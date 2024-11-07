import { GraphQLScalarType, Kind } from 'graphql';
import db from './db/connection.js';
import { Document } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

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
  rating?: { $gte?: number };
}

const countWithExclusions = async (
  input: FilterInput,
  excludeField: keyof FilterInput | null | 'publisher',
) => {
  const pipeline = buildPipelineWithoutSpecificFilters(input);

  // Exclude specific filters by modifying the pipeline
  if (excludeField !== 'genres' && input.genres && input.genres.length > 0) {
    pipeline.push({ $match: { genres: { $in: input.genres } } });
  }
  if (excludeField !== 'authors' && input.authors && input.authors.length > 0) {
    pipeline.push({ $match: { authors: { $in: input.authors } } });
  }
  if (excludeField !== 'publisher' && input.publishers && input.publishers.length > 0) {
    pipeline.push({ $match: { publisher: { $in: input.publishers } } });
  }
  if (excludeField !== 'minRating' && input.minRating) {
    pipeline.push({ $match: { rating: { $gte: input.minRating } } });
  }

  if (excludeField === null) {
    pipeline.push({ $count: 'all' });
    return await db.collection('books').aggregate(pipeline).toArray();
  }

  if (excludeField === 'minRating') {
    pipeline.push(
      {
        $facet: {
          '0': [{ $match: { rating: { $gte: 0 } } }, { $count: 'count' }],
          '1': [{ $match: { rating: { $gte: 1 } } }, { $count: 'count' }],
          '2': [{ $match: { rating: { $gte: 2 } } }, { $count: 'count' }],
          '3': [{ $match: { rating: { $gte: 3 } } }, { $count: 'count' }],
          '4': [{ $match: { rating: { $gte: 4 } } }, { $count: 'count' }],
          '5': [{ $match: { rating: { $gte: 5 } } }, { $count: 'count' }],
        },
      },
      {
        $project: {
          ratings: {
            $concatArrays: [
              [
                {
                  $mergeObjects: [
                    { rating: '0' },
                    { count: { $ifNull: [{ $arrayElemAt: ['$0.count', 0] }, 0] } },
                  ],
                },
              ],
              [
                {
                  $mergeObjects: [
                    { rating: '1' },
                    { count: { $ifNull: [{ $arrayElemAt: ['$1.count', 0] }, 0] } },
                  ],
                },
              ],
              [
                {
                  $mergeObjects: [
                    { rating: '2' },
                    { count: { $ifNull: [{ $arrayElemAt: ['$2.count', 0] }, 0] } },
                  ],
                },
              ],
              [
                {
                  $mergeObjects: [
                    { rating: '3' },
                    { count: { $ifNull: [{ $arrayElemAt: ['$3.count', 0] }, 0] } },
                  ],
                },
              ],
              [
                {
                  $mergeObjects: [
                    { rating: '4' },
                    { count: { $ifNull: [{ $arrayElemAt: ['$4.count', 0] }, 0] } },
                  ],
                },
              ],
              [
                {
                  $mergeObjects: [
                    { rating: '5' },
                    { count: { $ifNull: [{ $arrayElemAt: ['$5.count', 0] }, 0] } },
                  ],
                },
              ],
            ],
          },
        },
      },
      {
        $unwind: '$ratings',
      },
      {
        $replaceRoot: { newRoot: '$ratings' },
      },
    );
  } else {
    pipeline.push(
      { $unwind: `$${excludeField}` },
      { $group: { _id: `$${excludeField}`, count: { $sum: 1 } } },
      { $project: { name: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    );
  }

  const counts = await db.collection('books').aggregate(pipeline).toArray();
  return counts;
};

const buildPipelineWithoutSpecificFilters = ({
  search,
  sortInput,
  beforeDate,
  afterDate,
  minPages,
  maxPages,
}: FilterInput) => {
  const filters: MongoBookFilters = {};

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
  if (minPages && maxPages) {
    filters.pages = { $gte: minPages, $lte: maxPages };
  } else if (minPages) {
    filters.pages = { $gte: minPages };
  } else if (maxPages) {
    filters.pages = { $lte: maxPages };
  }

  const pipeline: Document[] = [{ $match: filters }];

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

  if (search) {
    const searchRegexSubString = new RegExp(search, 'i');
    const searchRegexWholeWords = new RegExp(`\\b${search}\\b`, 'i');
    filters.$or = [
      { title: { $regex: searchRegexSubString } },
      { description: { $regex: searchRegexWholeWords } },
    ];
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
      const pipeline = buildPipelineWithoutSpecificFilters(args.input ?? {});

      if (args.input.authors && args.input.authors.length > 0) {
        pipeline.push({ $match: { authors: { $in: args.input.authors } } });
      }
      if (args.input.genres && args.input.genres.length > 0) {
        pipeline.push({ $match: { genres: { $in: args.input.genres } } });
      }
      if (args.input.publishers && args.input.publishers.length > 0) {
        pipeline.push({ $match: { publisher: { $in: args.input.publishers } } });
      }
      if (args.input.minRating) {
        pipeline.push({ $match: { rating: { $gte: args.input.minRating } } });
      }

      const totalBooks = (await countWithExclusions(args.input ?? {}, null))[0]?.all || 0;

      pipeline.push({ $skip: args.offset * args.limit });
      pipeline.push({ $limit: args.limit });

      const books = await db.collection('books').aggregate(pipeline).toArray();

      return {
        books,
        summary: {
          totalBooks,
        },
      };
    },

    async filterCount(_, args: FilterCountInput) {
      const input = args.input ?? {};
      const genresCount = await countWithExclusions(input, 'genres');
      const authorsCount = await countWithExclusions(input, 'authors');
      const publishersCount = await countWithExclusions(input, 'publisher');
      const minRatingCount = await countWithExclusions(input, 'minRating');

      return {
        ratings: minRatingCount,
        genres: genresCount,
        authors: authorsCount,
        publishers: publishersCount,
      };
    },

    async authors() {
      return (await db.collection('books').distinct('authors')).map((author) => ({ name: author }));
    },

    async book(_, { id }: BookQueryArgs) {
      return await db.collection('books').findOne({ id: id });
    },

    async user(_, { UUID }: UserQueryArgs) {
      return await db
        .collection('users')
        .findOne({ UUID: UUID }, { projection: { userSecret: 0 } });
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
          const user = await db
            .collection('users')
            .findOne({ UUID: review.userUUID }, { projection: { userSecret: 0 } });

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

        const user = await db
          .collection('users')
          .findOne({ UUID: focusUserUUID }, { projection: { userSecret: 0 } });

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
        const user = await db
          .collection('users')
          .findOne({ UUID: review.userUUID }, { projection: { userSecret: 0 } });
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
  },

  Mutation: {
    async createUser() {
      const collection = db.collection('users');

      // The user needs a secret so that we can authenticate that its them since we dont have passwords
      const secret = crypto.randomBytes(32).toString('hex');

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
        secret: secret,
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

      const weightedSum = Object.entries(updatedBook.ratingsByStars).reduce(
        (sum, [key, count]: [string, number]) => {
          return sum + parseInt(key, 10) * count;
        },
        0,
      );

      const newRating = numRatings > 0 ? weightedSum / numRatings : 0;
      const finishedBook = await db.collection('books').findOneAndUpdate(
        { id: bookID },
        {
          $set: {
            rating: newRating,
          },
        },
        {
          returnDocument: 'after',
        },
      );
      return finishedBook.value;
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

        const weightedSum = Object.entries(updatedBook.ratingsByStars).reduce(
          (sum, [key, count]: [string, number]) => {
            return sum + parseInt(key, 10) * count;
          },
          0,
        );

        const newRating = numRatings > 0 ? weightedSum / numRatings : 0;
        const finishedBook = await db.collection('books').findOneAndUpdate(
          { id: oldReview.value.bookID },
          {
            $set: {
              rating: newRating,
            },
          },
          {
            returnDocument: 'after',
          },
        );

        return finishedBook.value;
      }
      return;
    },
  },
};

export default resolvers;
