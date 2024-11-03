import { describe, it, expect, vi, beforeEach } from 'vitest';
import resolvers, { SortBy, SortOrder } from '../resolvers.js';
import { Kind, ValueNode } from 'graphql';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';
import { count } from 'console';

vi.mock('./db/connection.js');

const mockBooks = [
  {
    _id: new ObjectId(),
    title: 'Book 1',
    authors: ['Author 1'],
    genres: ['Fantasy', 'Adventure'],
    publisher: 'Publisher 1',
    publishDate: new Date('2022-01-01'),
    pages: 320,
    ratingsByStars: { 1: 10, 2: 5, 3: 8, 4: 12, 5: 15 },
    roundedAverageRating: 3,
  },
  {
    _id: new ObjectId(),
    title: 'Book 2',
    authors: ['Author 2'],
    genres: ['Sci-Fi'],
    publisher: 'Publisher 2',
    publishDate: new Date('2020-06-15'),
    pages: 280,
    ratingsByStars: { 1: 3, 2: 7, 3: 10, 4: 20, 5: 30 },
    roundedAverageRating: 4,
  },
  // Additional mock data as needed
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
      it('should return books filtered by authors', async () => {
        db.collection = vi.fn().mockReturnValue({
          aggregate: vi
            .fn()
            .mockReturnValue({ toArray: vi.fn().mockResolvedValue([mockBooks[0]]) }),
          countDocuments: vi.fn().mockResolvedValue(1),
        });

        const args = { input: { authors: ['Author 1'] }, offset: 0, limit: 10 };
        const result = await resolvers.Query.books(null, args);

        expect(result.books).toEqual([mockBooks[0]]);
      });

      it('should handle sorting by title in ascending order', async () => {
        db.collection = vi.fn().mockReturnValue({
          aggregate: vi.fn().mockReturnValue({
            toArray: vi.fn().mockResolvedValue([mockBooks[0], mockBooks[1]]),
          }),
          countDocuments: vi.fn().mockResolvedValue(2),
        });

        const args = {
          input: {},
          sortInput: { sortBy: SortBy.Book, sortOrder: SortOrder.Ascending },
          offset: 0,
          limit: 10,
        };
        const result = await resolvers.Query.books(null, args);

        expect(result.books[0].title).toBe('Book 1');
        expect(result.books[1].title).toBe('Book 2');
      });
    });

    describe('dateSpan', () => {
      it('should return the earliest and latest publish dates', async () => {
        db.collection = vi.fn().mockReturnValue({
          find: vi.fn().mockReturnValue({
            sort: vi.fn().mockReturnValue({
              limit: vi.fn().mockReturnValue({ next: vi.fn().mockResolvedValue(mockBooks[0]) }),
            }),
          }),
        });

        const result = await resolvers.Query.dateSpan();
        expect(result).toEqual({
          earliest: mockBooks[0].publishDate,
          latest: mockBooks[0].publishDate,
        });
      });
    });

    describe('pageSpan', () => {
      it('should return the least and most number of pages', async () => {
        db.collection = vi.fn().mockReturnValue({
          find: vi.fn().mockReturnValue({
            sort: vi.fn().mockReturnValue({
              limit: vi.fn().mockReturnValue({ next: vi.fn().mockResolvedValue(mockBooks[0]) }),
            }),
          }),
        });

        const result = await resolvers.Query.pageSpan();
        expect(result).toEqual({
          least: mockBooks[0].pages,
          most: mockBooks[0].pages,
        });
      });
    });

    describe('Book', () => {
      it('should return the total number of ratings', async () => {
        const book = mockBooks[0];
        const result = await resolvers.Book.numRatings(book);
        expect(result).toEqual(50);
      });
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
