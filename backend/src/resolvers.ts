import { GraphQLScalarType, Kind } from 'graphql';
import db from './db/connection.js';
import { Document } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

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

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description:
      "A Date can be a string in the format 'YYYY-MM-DD' or a number representing the milliseconds since the Unix epoch (1970-01-01T00:00:00Z)",
    parseValue(value: string | number) {
      return new Date(value);
    },
    serialize(value: number) {
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
      }: BooksQueryArgs,
    ) {
      const collection = db.collection('books');

      interface MongoBookFilters {
        $or?: { [key: string]: { $regex: RegExp } }[];
        publishDate?: { $lt?: number; $gt?: number };
        authors?: { $in: string[] };
        genres?: { $in: string[] };
        publisher?: { $in: string[] };
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
          $lt: beforeDate.valueOf(),
          $gt: afterDate.valueOf(),
        };
      } else if (beforeDate) {
        filters.publishDate = { $lt: beforeDate.valueOf() };
      } else if (afterDate) {
        filters.publishDate = { $gt: afterDate.valueOf() };
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

      const pipeline: Document[] = [];
      pipeline.push({ $match: filters });

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

      const totalBooks = await collection.countDocuments(filters);
      const totalPages = Math.ceil(totalBooks / limit);
      const currentPage = Math.floor(offset / limit) + 1;
      const isLastPage = currentPage >= totalPages;
      const skip = offset * limit;

      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: limit });

      const books = await collection.aggregate(pipeline).toArray();

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
