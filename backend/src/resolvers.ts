import { GraphQLScalarType, Kind } from "graphql";
import db from "./db/connection.js";
import { Document } from "mongodb";

interface OrderByInput {
  bookName?: "asc" | "desc";
  authorName?: "asc" | "desc";
  publisherName?: "asc" | "desc";
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
}

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
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
        orderBy,
        beforeDate,
        afterDate,
        authors,
        genres,
        publishers,
      }: BooksQueryArgs
    ) {
      const collection = db.collection("books");

      interface MongoBookFilters {
        $text?: { $search: string };
        publishDate?: { $lt?: number; $gt?: number };
        authors?: { $in: string[] };
        genres?: { $in: string[] };
        publisher?: { $in: string[] };
      }

      const filters: MongoBookFilters = {};
      if (search) {
        filters.$text = { $search: search };
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
            $sort: {
              "authors.0": orderBy.authorName === "asc" ? 1 : -1,
            },
          });
        } else if (orderBy.publisherName) {
          pipeline.push({
            $sort: {
              publisher: orderBy.publisherName === "asc" ? 1 : -1,
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
      return (await db.collection("books").distinct("authors")).map(
        (author) => ({ name: author })
      );
    },

    async genres() {
      return (await db.collection("books").distinct("genres")).map((genre) => ({
        name: genre,
      }));
    },

    async publishers() {
      return (await db.collection("books").distinct("publisher")).map(
        (publisher) => ({ name: publisher })
      );
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
    ratingsByStars: async (book: {
      ratingsByStars: { [x: number]: number };
    }) => {
      return Array.from({ length: 6 }, (_, i) => book.ratingsByStars[i] || 0);
    },
  },
};

export default resolvers;
