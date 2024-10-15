import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import resolvers from "../resolvers.js";
import { Kind } from "graphql";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

vi.mock("./db/connection.js");

describe("resolvers", () => {
  describe("Date scalar", () => {
    const { Date } = resolvers;

    it("should parse value from string", () => {
      const date = Date.parseValue("2023-01-01");
      expect(date).toEqual(new globalThis.Date("2023-01-01"));
    });

    it("should parse value from number", () => {
      const date = Date.parseValue(1672531200000);
      expect(date).toEqual(new globalThis.Date(1672531200000));
    });

    it("should serialize date", () => {
      const date = new globalThis.Date("2023-01-01");
      expect(Date.serialize(date)).toEqual(date);
    });

    it("should parse literal from string", () => {
      const ast = { kind: Kind.STRING, value: "2023-01-01" };
      const date = Date.parseLiteral(ast as any);
      expect(date).toEqual(new globalThis.Date("2023-01-01"));
    });

    it("should parse literal from numerical string", () => {
      const ast = { kind: Kind.STRING, value: "1672531200000" };
      const date = Date.parseLiteral(ast as any);
      expect(date).toEqual(new globalThis.Date(1672531200000));
    });

    it("should parse literal from int", () => {
      const ast = { kind: Kind.INT, value: 1672531200000 };
      const date = Date.parseLiteral(ast as any);
      expect(date).toEqual(new globalThis.Date(1672531200000));
    });
  });

  describe("Query", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    describe("books", () => {
      it("should return books with pagination", async () => {
        const mockBooks = [
          { _id: new ObjectId(), title: "Book 1" },
          { _id: new ObjectId(), title: "Book 2" },
        ];
        const mockCount = 2;

        db.collection = vi.fn().mockReturnValue({
          aggregate: vi
            .fn()
            .mockReturnValue({ toArray: vi.fn().mockResolvedValue(mockBooks) }),
          countDocuments: vi.fn().mockResolvedValue(mockCount),
        });

        const args = {
          limit: 2,
          offset: 0,
          orderBy: { bookName: "asc" as "asc" | "desc" },
        };

        const result = await resolvers.Query.books(null, args);

        expect(result.books).toEqual(mockBooks);
        expect(result.pagination.totalPages).toBe(1);
        expect(result.pagination.currentPage).toBe(1);
        expect(result.pagination.isLastPage).toBe(true);
      });
    });

    describe("authors", () => {
      it("should return all authors", async () => {
        const mockAuthors = [{ uuid: "1", name: "Author 1" }];
        (db.collection as Mock).mockReturnValue({
          find: vi
            .fn()
            .mockReturnValue({
              toArray: vi.fn().mockResolvedValue(mockAuthors),
            }),
        });

        const result = await resolvers.Query.authors();
        expect(result).toEqual(mockAuthors);
      });
    });

    describe("genres", () => {
      it("should return all genres", async () => {
        const mockGenres = [{ uuid: "1", name: "Genre 1" }];
        (db.collection as unknown as Mock).mockReturnValue({
          find: vi
            .fn()
            .mockReturnValue({
              toArray: vi.fn().mockResolvedValue(mockGenres),
            }),
        });

        const result = await resolvers.Query.genres();
        expect(result).toEqual(mockGenres);
      });
    });

    describe("publishers", () => {
      it("should return all publishers", async () => {
        const mockPublishers = [{ uuid: "1", name: "Publisher 1" }];
        (db.collection as unknown as Mock).mockReturnValue({
          find: vi
            .fn()
            .mockReturnValue({
              toArray: vi.fn().mockResolvedValue(mockPublishers),
            }),
        });

        const result = await resolvers.Query.publishers();
        expect(result).toEqual(mockPublishers);
      });
    });
  });

  describe("Book", () => {
    it("should return book id", () => {
      const book = { uuid: "1" };
      const result = resolvers.Book.id(book);
      expect(result).toBe("1");
    });

    it("should return book authors", async () => {
      const book = { authors: ["1"] };
      const mockAuthor = { uuid: "1", name: "Author 1" };
      (db.collection as Mock).mockReturnValue({
        findOne: vi.fn().mockResolvedValue(mockAuthor),
      });

      const result = await resolvers.Book.authors(book);
      expect(result).toEqual([mockAuthor]);
    });

    it("should return book genres", async () => {
      const book = { genres: ["1"] };
      const mockGenre = { uuid: "1", name: "Genre 1" };
      (db.collection as unknown as Mock).mockReturnValue({
        findOne: vi.fn().mockResolvedValue(mockGenre),
      });

      const result = await resolvers.Book.genres(book);
      expect(result).toEqual([mockGenre]);
    });

    it("should return book publisher", async () => {
      const book = { publisher: "1" };
      const mockPublisher = { uuid: "1", name: "Publisher 1" };
      (db.collection as unknown as Mock).mockReturnValue({
        findOne: vi.fn().mockResolvedValue(mockPublisher),
      });

      const result = await resolvers.Book.publisher(book);
      expect(result).toEqual(mockPublisher);
    });

    it("should return book ratings by stars", async () => {
      const book = { ratingsByStars: { 1: 5, 2: 3 } };
      const result = await resolvers.Book.ratingsByStars(book);
      expect(result).toEqual([0, 5, 3, 0, 0, 0]);
    });
  });

  describe("Author", () => {
    it("should return author id", () => {
      const author = { uuid: "1" };
      const result = resolvers.Author.id(author);
      expect(result).toBe("1");
    });
  });

  describe("Genre", () => {
    it("should return genre id", () => {
      const genre = { uuid: "1" };
      const result = resolvers.Genre.id(genre);
      expect(result).toBe("1");
    });
  });

  describe("Publisher", () => {
    it("should return publisher id", () => {
      const publisher = { uuid: "1" };
      const result = resolvers.Publisher.id(publisher);
      expect(result).toBe("1");
    });
  });
});
