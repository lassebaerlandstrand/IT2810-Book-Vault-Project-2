import { describe, it, expect, vi, beforeEach } from 'vitest';
import resolvers from '../resolvers.js';
import { Kind, ValueNode } from 'graphql';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

vi.mock('./db/connection.js');

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
        const mockBooks = [
          { _id: new ObjectId(), title: 'Book 1' },
          { _id: new ObjectId(), title: 'Book 2' },
        ];
        const mockCount = 2;

        db.collection = vi.fn().mockReturnValue({
          aggregate: vi.fn().mockReturnValue({ toArray: vi.fn().mockResolvedValue(mockBooks) }),
          countDocuments: vi.fn().mockResolvedValue(mockCount),
        });

        const args = {
          limit: 2,
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
        const mockBooks = [
          {
            _id: new ObjectId(),
            title: 'Book by Author 1',
            authors: ['Author 1'],
          },
        ];

        db.collection = vi.fn().mockReturnValue({
          aggregate: vi.fn().mockReturnValue({ toArray: vi.fn().mockResolvedValue(mockBooks) }),
          countDocuments: vi.fn().mockResolvedValue(1),
        });

        const args = {
          authors: ['Author 1'],
        };

        const result = await resolvers.Query.books(null, args);
        expect(result.books).toEqual(mockBooks);
      });

      it('should return books filtered by genres', async () => {
        const mockBooks = [
          { _id: new ObjectId(), title: 'Book 1', genres: ['Fantasy'] },
          { _id: new ObjectId(), title: 'Book 2', genres: ['Fantasy'] },
        ];

        db.collection = vi.fn().mockReturnValue({
          aggregate: vi.fn().mockReturnValue({ toArray: vi.fn().mockResolvedValue(mockBooks) }),
          countDocuments: vi.fn().mockResolvedValue(2),
        });

        const args = {
          genres: ['Fantasy'],
        };

        const result = await resolvers.Query.books(null, args);
        expect(result.books).toEqual(mockBooks);
      });

      it('should return books filtered by publishers', async () => {
        const mockBooks = [{ _id: new ObjectId(), title: 'Book 1', publisher: 'Publisher 1' }];

        db.collection = vi.fn().mockReturnValue({
          aggregate: vi.fn().mockReturnValue({ toArray: vi.fn().mockResolvedValue(mockBooks) }),
          countDocuments: vi.fn().mockResolvedValue(1),
        });

        const args = {
          publishers: ['Publisher 1'],
        };

        const result = await resolvers.Query.books(null, args);
        expect(result.books).toEqual(mockBooks);
      });
    });

    describe('authors', () => {
      it('should return a distinct list of authors', async () => {
        const mockAuthors = ['Author 1', 'Author 2'];
        db.collection = vi.fn().mockReturnValue({
          distinct: vi.fn().mockResolvedValue(mockAuthors),
        });

        const result = await resolvers.Query.authors();

        expect(result).toEqual([{ name: 'Author 1' }, { name: 'Author 2' }]);
      });
    });

    describe('genres', () => {
      it('should return a distinct list of genres', async () => {
        const mockGenres = ['Fantasy', 'Sci-Fi'];
        db.collection = vi.fn().mockReturnValue({
          distinct: vi.fn().mockResolvedValue(mockGenres),
        });

        const result = await resolvers.Query.genres();

        expect(result).toEqual([{ name: 'Fantasy' }, { name: 'Sci-Fi' }]);
      });
    });

    describe('publishers', () => {
      it('should return a distinct list of publishers', async () => {
        const mockPublishers = ['Publisher 1', 'Publisher 2'];
        db.collection = vi.fn().mockReturnValue({
          distinct: vi.fn().mockResolvedValue(mockPublishers),
        });

        const result = await resolvers.Query.publishers();

        expect(result).toEqual([{ name: 'Publisher 1' }, { name: 'Publisher 2' }]);
      });
    });
  });

  describe('Book', () => {
    it('should return the total number of ratings', async () => {
      const book = { ratingsByStars: { 1: 5, 2: 3 } };
      const result = await resolvers.Book.numRatings(book);
      expect(result).toEqual(8);
    });

    it('should return weighted sum of ratings', async () => {
      const book = { ratingsByStars: { 1: 5, 2: 3 } };
      const result = await resolvers.Book.rating(book);
      expect(result).toEqual((1 * 5 + 2 * 3) / 8);
    });

    it('should return authors for a book', async () => {
      const book = { authors: ['Author 1', 'Author 2'] };
      const result = await resolvers.Book.authors(book);
      expect(result).toEqual([{ name: 'Author 1' }, { name: 'Author 2' }]);
    });

    it('should return genres for a book', async () => {
      const book = { genres: ['Fantasy', 'Adventure'] };
      const result = await resolvers.Book.genres(book);
      expect(result).toEqual([{ name: 'Fantasy' }, { name: 'Adventure' }]);
    });

    it('should return publisher for a book', async () => {
      const book = { publisher: 'Publisher 1' };
      const result = await resolvers.Book.publisher(book);
      expect(result).toEqual({ name: 'Publisher 1' });
    });
  });

  describe('randomBook', () => {
    it('should return a random book', async () => {
      const mockBooks = [
        { _id: new ObjectId(), title: 'Book 1' },
        { _id: new ObjectId(), title: 'Book 2' },
      ];

      db.collection = vi.fn().mockReturnValue({
        aggregate: vi.fn().mockReturnValue({ toArray: vi.fn().mockResolvedValue([mockBooks[0]]) }),
      });

      const result = await resolvers.Query.randomBook();

      expect(result).toEqual(mockBooks[0]);
    });
  });

  describe('Stats', () => {
    it('should return total number of books', async () => {
      const mockCount = 10;
      db.collection = vi.fn().mockReturnValue({
        countDocuments: vi.fn().mockResolvedValue(mockCount),
      });

      const result = await resolvers.Stats.totalBooks();
      expect(result).toEqual(mockCount);
    });

    it('should return total number of authors', async () => {
      const mockAuthors = ['Author 1', 'Author 2'];
      db.collection = vi.fn().mockReturnValue({
        distinct: vi.fn().mockResolvedValue(mockAuthors),
      });

      const result = await resolvers.Stats.totalAuthors();
      expect(result).toEqual(mockAuthors.length);
    });

    it('should return total number of ratings', async () => {
      const mockTotalRatings = [{ _id: null, totalRatings: 15 }];
      db.collection = vi.fn().mockReturnValue({
        aggregate: vi
          .fn()
          .mockReturnValue({ toArray: vi.fn().mockResolvedValue(mockTotalRatings) }),
      });

      const result = await resolvers.Stats.totalRatings();
      expect(result).toEqual(mockTotalRatings[0].totalRatings);
    });
  });
});
