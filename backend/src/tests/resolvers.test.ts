import { describe, it, expect, vi, beforeEach } from "vitest";
import resolvers from "../resolvers.js";
import { Kind, ValueNode } from "graphql";
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
      const date = Date.parseLiteral(ast as ValueNode);
      expect(date).toEqual(new globalThis.Date("2023-01-01"));
    });

    it("should parse literal from numerical string", () => {
      const ast = { kind: Kind.STRING, value: "1672531200000" };
      const date = Date.parseLiteral(ast as ValueNode);
      expect(date).toEqual(new globalThis.Date(1672531200000));
    });

    it("should parse literal from int", () => {
      const ast = { kind: Kind.INT, value: 1672531200000 };
      const date = Date.parseLiteral(ast as ValueNode);
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
  });

  describe("Book", () => {
    it("should return book ratings by stars", async () => {
      const book = { ratingsByStars: { 1: 5, 2: 3 } };
      const result = await resolvers.Book.ratingsByStars(book);
      expect(result).toEqual([0, 5, 3, 0, 0, 0]);
    });
  });
});
