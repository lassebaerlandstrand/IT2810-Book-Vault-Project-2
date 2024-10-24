import { describe, it, expect, vi, beforeEach } from 'vitest';
import resolvers from '../resolvers.js';
import { Kind, ValueNode } from 'graphql';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

vi.mock('./db/connection.js');

const mockBooks = [
  {
    _id: new ObjectId(),
    title: "Book 1",
    authors: ["Author 1"],
    genres: ["Fantasy", "Adventure"],
    publisher: "Publisher 1",
    publishDate: new Date("2022-01-01"),
    pages: 320,
    ratingsByStars: { 1: 10, 2: 5, 3: 8, 4: 12, 5: 15 },
  },
  {
    _id: new ObjectId(),
    title: "Book 2",
    authors: ["Author 2"],
    genres: ["Sci-Fi"],
    publisher: "Publisher 2",
    publishDate: new Date("2020-06-15"),
    pages: 280,
    ratingsByStars: { 1: 3, 2: 7, 3: 10, 4: 20, 5: 30 },
  },
  {
    _id: new ObjectId(),
    title: "Book 3",
    authors: ["Author 3"],
    genres: ["Mystery", "Thriller"],
    publisher: "Publisher 3",
    publishDate: new Date("2018-03-10"),
    pages: 350,
    ratingsByStars: { 1: 1, 2: 3, 3: 5, 4: 7, 5: 9 },
  },
  {
    _id: new ObjectId(),
    title: "Book 4",
    authors: ["Author 4"],
    genres: ["Non-Fiction"],
    publisher: "Publisher 4",
    publishDate: new Date("2019-11-20"),
    pages: 400,
    ratingsByStars: { 1: 2, 2: 4, 3: 8, 4: 16, 5: 20 },
  },
  {
    _id: new ObjectId(),
    title: "Book 5",
    authors: ["Author 5"],
    genres: ["Romance"],
    publisher: "Publisher 5",
    publishDate: new Date("2021-05-25"),
    pages: 250,
    ratingsByStars: { 1: 0, 2: 2, 3: 4, 4: 6, 5: 12 },
  },
];

describe('resolvers', () => {
  describe('Date scalar', () => {
    const { Date } = resolvers;

    it('should parse value from string', () => {
      const date = Date.parseValue('2023-01-01');
      expect(date).toEqual(new globalThis.Date('2023-01-01'));
    });

    it('should parse value from number', () => {
      const date = Date.parseValue(1672531200000);
      expect(date).toEqual(new globalThis.Date(1672531200000));
    });

    it('should serialize date', () => {
      const date = new globalThis.Date('2023-01-01');
      expect(Date.serialize(date)).toEqual(date);
    });

    it('should parse literal from string', () => {
      const ast = { kind: Kind.STRING, value: '2023-01-01' };
      const date = Date.parseLiteral(ast as ValueNode);
      expect(date).toEqual(new globalThis.Date('2023-01-01'));
    });

    it('should parse literal from int', () => {
      const ast = { kind: Kind.INT, value: 1672531200000 };
      const date = Date.parseLiteral(ast as ValueNode);
      expect(date).toEqual(new globalThis.Date(1672531200000));
    });
  });

  describe('Query', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    describe('books', () => {
      it('should return books with pagination', async () => {
        db.collection = vi.fn().mockReturnValue({
          aggregate: vi.fn().mockReturnValue({ toArray: vi.fn().mockResolvedValue(mockBooks) }),
          countDocuments: vi.fn().mockResolvedValue(mockBooks.length),
        });

        const args = {
          limit: 5,
          offset: 0,
          orderBy: { bookName: 'asc' as 'asc' | 'desc' },
        };

        const result = await resolvers.Query.books(null, args);

        expect(result.books).toEqual(mockBooks);
        expect(result.pagination.totalPages).toBe(1);
        expect(result.pagination.currentPage).toBe(1);
        expect(result.pagination.isLastPage).toBe(true);
      });

      it('should return books filtered by authors', async () => {
        db.collection = vi.fn().mockReturnValue({
          aggregate: vi.fn().mockReturnValue({ toArray: vi.fn().mockResolvedValue([mockBooks[0]]) }),
          countDocuments: vi.fn().mockResolvedValue(1),
        });

        const args = { authors: ['Author 1'] };
        const result = await resolvers.Query.books(null, args);

        expect(result.books).toEqual([mockBooks[0]]);
      });

      it('should return books filtered by genres', async () => {
        db.collection = vi.fn().mockReturnValue({
          aggregate: vi.fn().mockReturnValue({ toArray: vi.fn().mockResolvedValue([mockBooks[0]]) }),
          countDocuments: vi.fn().mockResolvedValue(1),
        });

        const args = { genres: ['Fantasy'] };
        const result = await resolvers.Query.books(null, args);

        expect(result.books).toEqual([mockBooks[0]]);
      });

      it('should return books filtered by publishers', async () => {
        db.collection = vi.fn().mockReturnValue({
          aggregate: vi.fn().mockReturnValue({ toArray: vi.fn().mockResolvedValue([mockBooks[0]]) }),
          countDocuments: vi.fn().mockResolvedValue(1),
        });

        const args = { publishers: ['Publisher 1'] };
        const result = await resolvers.Query.books(null, args);

        expect(result.books).toEqual([mockBooks[0]]);
      });
    });

    describe('authors', () => {
      it('should return a distinct list of authors', async () => {
        const mockAuthors = mockBooks.map((book) => book.authors).flat();
        db.collection = vi.fn().mockReturnValue({
          distinct: vi.fn().mockResolvedValue(mockAuthors),
        });

        const result = await resolvers.Query.authors();
        expect(result).toEqual(mockAuthors.map(name => ({ name })));
      });
    });

    describe('genres', () => {
      it('should return a distinct list of genres', async () => {
        const mockGenres = mockBooks.map((book) => book.genres).flat();
        db.collection = vi.fn().mockReturnValue({
          distinct: vi.fn().mockResolvedValue(mockGenres),
        });

        const result = await resolvers.Query.genres();
        expect(result).toEqual(mockGenres.map(name => ({ name })));
      });
    });

    describe('publishers', () => {
      it('should return a distinct list of publishers', async () => {
        const mockPublishers = mockBooks.map((book) => book.publisher);
        db.collection = vi.fn().mockReturnValue({
          distinct: vi.fn().mockResolvedValue(mockPublishers),
        });

        const result = await resolvers.Query.publishers();
        expect(result).toEqual(mockPublishers.map(name => ({ name })));
      });
    });
  });

  describe('Book', () => {
    it('should return the total number of ratings', async () => {
      const book = mockBooks[0];
      const result = await resolvers.Book.numRatings(book);
      expect(result).toEqual(
        Object.values(book.ratingsByStars).reduce((sum, count) => sum + count, 0)
      );
    });

    it('should return weighted sum of ratings', async () => {
      const book = mockBooks[0];
      const totalRatings = Object.values(book.ratingsByStars).reduce((sum, count) => sum + count, 0);
      const weightedSum = Object.entries(book.ratingsByStars).reduce(
        (sum, [star, count]) => sum + parseInt(star) * count,
        0
      );

      const result = await resolvers.Book.rating(book);
      expect(result).toEqual(weightedSum / totalRatings);
    });

    it('should return authors for a book', async () => {
      const book = mockBooks[0];
      const result = await resolvers.Book.authors(book);
      expect(result).toEqual(book.authors.map((name) => ({ name })));
    });

    it('should return genres for a book', async () => {
      const book = mockBooks[0];
      const result = await resolvers.Book.genres(book);
      expect(result).toEqual(book.genres.map((name) => ({ name })));
    });

    it('should return publisher for a book', async () => {
      const book = mockBooks[0];
      const result = await resolvers.Book.publisher(book);
      expect(result).toEqual({ name: book.publisher });
    });
  });
});
