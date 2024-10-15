import { GraphQLScalarType, Kind } from "graphql";
import db from "./db/connection.js";
import { Document } from "mongodb";

interface OrderByInput {
  bookName?: "asc" | "desc";
  authorName?: "asc" | "desc";
  publisherName?: "asc" | "desc";
}

interface BooksQueryArgs {
  limit?: number;
  offset?: number;
  orderBy?: OrderByInput;
  beforeDate?: Date;
  afterDate?: Date;
  authors?: string[];
  genres?: string[];
  publishers?: string[];
}

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description:
      "A Date can be a string in the format 'YYYY-MM-DD' or a number representing the milliseconds since the Unix epoch (1970-01-01T00:00:00Z)",
    parseValue(value: string | number) {
      return new Date(value);
    },
    serialize(value) {
      return value;
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
        limit = 10,
        offset = 0,
        orderBy,
        beforeDate,
        afterDate,
        authors,
        genres,
        publishers,
      }: BooksQueryArgs
    ) {
      const collection = db.collection("books");
      console.log("beforeDate", beforeDate);
      console.log("afterDate", afterDate);

      interface MongoBookFilters {
        publishDate?: { $lt?: number; $gt?: number };
        authors?: { $in: string[] };
        genres?: { $in: string[] };
        publisher?: { $in: string[] };
      }

      const filters: MongoBookFilters = {};
      if (beforeDate) {
        filters.publishDate = { $lt: beforeDate.valueOf() };
      }
      if (afterDate) {
        filters.publishDate = { $gt: afterDate.valueOf() };
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

      const pipeline: Document[] = [];
      pipeline.push({ $match: filters });

      if (orderBy) {
        if (orderBy.bookName) {
          pipeline.push({
            $sort: { title: orderBy.bookName === "asc" ? 1 : -1 },
          });
        } else if (orderBy.authorName) {
          pipeline.push({
            $lookup: {
              from: "authors",
              localField: "authors",
              foreignField: "uuid",
              as: "authorDetails",
            },
          });
          pipeline.push({
            $sort: {
              "authorDetails.name": orderBy.authorName === "asc" ? 1 : -1,
            },
          });
        } else if (orderBy.publisherName) {
          pipeline.push({
            $lookup: {
              from: "publishers",
              localField: "publisher",
              foreignField: "uuid",
              as: "publisherDetails",
            },
          });
          pipeline.push({
            $sort: {
              "publisherDetails.name": orderBy.publisherName === "asc" ? 1 : -1,
            },
          });
        }
      }
      const totalCount = await collection.countDocuments(filters);
      const totalPages = Math.ceil(totalCount / limit);
      const currentPage = Math.floor(offset / limit) + 1;
      const isLastPage = currentPage >= totalPages;

      pipeline.push({ $skip: offset });
      pipeline.push({ $limit: limit });
      const books = await collection.aggregate(pipeline).toArray();
      console.log("books", books);

      return {
        books,
        pagination: {
          totalPages,
          currentPage,
          isLastPage,
        },
      };
    },

    async authors() {
      // let collection = db.collection("authors");
      // return await collection.find({}).toArray();
      let collection = db.collection("books");
      // authors is a list of strings, i want all unique authors
      return await collection.distinct("authors");
    },

    async genres() {
      let collection = db.collection("genres");
      return await collection.find({}).toArray();
    },

    async publishers() {
      let collection = db.collection("publishers");
      return await collection.find({}).toArray();
    },
  },

  Book: {
    id: (book: { uuid: string }) => book.uuid,
    authors: async (book: { authors: string[] }) => {
      const authorCollection = db.collection("authors");
      return Promise.all(
        book.authors.map(async (authorId: string) => {
          return await authorCollection.findOne({
            uuid: authorId,
          });
        })
      );
    },
    genres: async (book: { genres: string[] }) => {
      const genreCollection = db.collection("genres");
      return Promise.all(
        book.genres.map(async (genreId: string) => {
          return await genreCollection.findOne({
            uuid: genreId,
          });
        })
      );
    },
    publisher: async (book: { publisher: string }) => {
      const publisherCollection = db.collection("publishers");
      return await publisherCollection.findOne({
        uuid: book.publisher,
      });
    },
    ratingsByStars: async (book: {
      ratingsByStars: { [x: number]: number };
    }) => {
      return Array.from({ length: 6 }, (_, i) => book.ratingsByStars[i] || 0);
    },
  },

  Author: {
    id: (author: { uuid: string }) => author.uuid,
  },

  Genre: {
    id: (genre: { uuid: string }) => genre.uuid,
  },

  Publisher: {
    id: (publisher: { uuid: string }) => publisher.uuid,
  },
};

export default resolvers;
