import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
};

export type Author = {
  __typename?: 'Author';
  /** Name of the author */
  name: Scalars['ID']['output'];
};

export type Book = {
  __typename?: 'Book';
  /** List of authors of the book */
  authors: Array<Author>;
  /** List of awards the book has received */
  awards?: Maybe<Array<Scalars['String']['output']>>;
  /** Format of the book (e.g., hardcover, paperback, ebook) */
  bookFormat: Scalars['String']['output'];
  /** List of characters in the book */
  characters?: Maybe<Array<Scalars['String']['output']>>;
  /** URL for the cover image of the book */
  coverImg: Scalars['String']['output'];
  /** Description of the book */
  description: Scalars['String']['output'];
  /** List of genres the book belongs to */
  genres: Array<Genre>;
  /** Unique identifier for the book */
  id: Scalars['ID']['output'];
  /** ISBN number of the book */
  isbn: Scalars['String']['output'];
  /** Language of the book */
  language: Scalars['String']['output'];
  /** Total number of ratings. */
  numRatings: Scalars['Int']['output'];
  /** Position of the book in the series */
  numberInSeries?: Maybe<Scalars['Int']['output']>;
  /** Number of pages in the book */
  pages: Scalars['Int']['output'];
  /** Date the book was published */
  publishDate: Scalars['Date']['output'];
  /** Publisher of the book */
  publisher: Publisher;
  /** Weighted sum of the ratings. */
  rating: Scalars['Float']['output'];
  /** The series the book belongs to, if any */
  series?: Maybe<Scalars['String']['output']>;
  /** Setting of the book. A list of locations/periods where the book takes place */
  setting?: Maybe<Array<Scalars['String']['output']>>;
  /** Title of the book */
  title: Scalars['String']['output'];
};

/** Paginated list of books */
export type BookPagination = {
  __typename?: 'BookPagination';
  books: Array<Book>;
  pagination: PaginationInfo;
  summary: BookSummary;
};

export type BookSummary = {
  __typename?: 'BookSummary';
  totalBooks: Scalars['Int']['output'];
};

export type CreateReviewInput = {
  bookID: Scalars['String']['input'];
  description: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
  userUUID: Scalars['String']['input'];
};

export type Genre = {
  __typename?: 'Genre';
  /** Name of the genre */
  name: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createReview: UpdatedRating;
  createUser: User;
  updateReview?: Maybe<UpdatedRating>;
};

export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};

export type MutationUpdateReviewArgs = {
  input: UpdateReviewInput;
};

/** General pagination information */
export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  currentPage: Scalars['Int']['output'];
  isLastPage: Scalars['Boolean']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Publisher = {
  __typename?: 'Publisher';
  /** Name of the publisher */
  name: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Retrieve a list of authors */
  authors: Array<Author>;
  /** Retrieve a specific book based on id */
  book: Book;
  bookReview?: Maybe<Review>;
  /** Retrieve book reviews */
  bookReviews: ReviewPagination;
  /** Retrieve a list of books with optional filters */
  books: BookPagination;
  /** Retrieve a list of genres */
  genres: Array<Genre>;
  /** Retrieve a list of publishers */
  publishers: Array<Publisher>;
  /** Returns a random book */
  randomBook: Book;
  /** Retrieve statistics about the website */
  stats: Stats;
  user: User;
};

export type QueryBookArgs = {
  id: Scalars['String']['input'];
};

export type QueryBookReviewArgs = {
  bookID: Scalars['String']['input'];
  userUUID: Scalars['String']['input'];
};

export type QueryBookReviewsArgs = {
  avoidUserUUID?: InputMaybe<Scalars['String']['input']>;
  bookID?: InputMaybe<Scalars['String']['input']>;
  focusUserUUID?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type QueryBooksArgs = {
  afterDate?: InputMaybe<Scalars['Date']['input']>;
  authors?: InputMaybe<Array<Scalars['String']['input']>>;
  beforeDate?: InputMaybe<Scalars['Date']['input']>;
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  publishers?: InputMaybe<Array<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortInput?: InputMaybe<SortInput>;
};

export type QueryUserArgs = {
  UUID: Scalars['String']['input'];
};

export type Review = {
  __typename?: 'Review';
  /** id for review */
  UUID: Scalars['ID']['output'];
  at: Scalars['Date']['output'];
  book?: Maybe<Book>;
  description: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  user?: Maybe<User>;
};

export type ReviewPagination = {
  __typename?: 'ReviewPagination';
  pagination: PaginationInfo;
  reviews: Array<Review>;
  summary: ReviewSummary;
};

export type ReviewSummary = {
  __typename?: 'ReviewSummary';
  total: Scalars['Int']['output'];
};

export enum SortBy {
  /** Sort by author name */
  AuthorName = 'authorName',
  /** Sort by book name */
  BookName = 'bookName',
  /** Sort by publisher name */
  PublisherName = 'publisherName',
}

export type SortInput = {
  sortBy: SortBy;
  sortOrder: SortOrder;
};

export enum SortOrder {
  /** Sort in ascending order */
  Asc = 'asc',
  /** Sort in descending order */
  Desc = 'desc',
}

export type Stats = {
  __typename?: 'Stats';
  /** Total number of authors */
  totalAuthors: Scalars['Int']['output'];
  /** Total number of books */
  totalBooks: Scalars['Int']['output'];
  /** Total number of ratings */
  totalRatings: Scalars['Int']['output'];
};

export type GetBooksQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortInput?: InputMaybe<SortInput>;
  authors?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  genres?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  publishers?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;

export type GetBooksQuery = {
  __typename?: 'Query';
  books: {
    __typename?: 'BookPagination';
    books: Array<{
      __typename?: 'Book';
      id: string;
      title: string;
      coverImg: string;
      rating: number;
      authors: Array<{ __typename?: 'Author'; name: string }>;
    }>;
    summary: { __typename?: 'BookSummary'; totalBooks: number };
  };
};

export type GetBookQueryVariables = Exact<{
  bookId: Scalars['String']['input'];
}>;

export type GetBookQuery = {
  __typename?: 'Query';
  book: {
    __typename?: 'Book';
    id: string;
    title: string;
    series?: string | null;
    numberInSeries?: number | null;
    language: string;
    isbn: string;
    coverImg: string;
    rating: number;
    numRatings: number;
    characters?: Array<string> | null;
    bookFormat: string;
    pages: number;
    publishDate: any;
    awards?: Array<string> | null;
    setting?: Array<string> | null;
    description: string;
    publisher: { __typename?: 'Publisher'; name: string };
    genres: Array<{ __typename?: 'Genre'; name: string }>;
    authors: Array<{ __typename?: 'Author'; name: string }>;
  };
};

export type GetRandomBookQueryVariables = Exact<{ [key: string]: never }>;

export type GetRandomBookQuery = {
  __typename?: 'Query';
  randomBook: { __typename?: 'Book'; id: string };
};

export type GetAuthorsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAuthorsQuery = {
  __typename?: 'Query';
  authors: Array<{ __typename?: 'Author'; name: string }>;
};

export type GetGenresQueryVariables = Exact<{ [key: string]: never }>;

export type GetGenresQuery = {
  __typename?: 'Query';
  genres: Array<{ __typename?: 'Genre'; name: string }>;
};

export type GetPublishersQueryVariables = Exact<{ [key: string]: never }>;

export type GetPublishersQuery = {
  __typename?: 'Query';
  publishers: Array<{ __typename?: 'Publisher'; name: string }>;
};

export type QueryQueryVariables = Exact<{ [key: string]: never }>;

export type QueryQuery = {
  __typename?: 'Query';
  stats: { __typename?: 'Stats'; totalBooks: number; totalAuthors: number; totalRatings: number };
};

export const GetBooksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBooks' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'search' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sortInput' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'SortInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'authors' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'genres' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'publishers' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'books' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'search' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sortInput' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'authors' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'authors' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'genres' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'genres' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'publishers' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'publishers' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'books' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'coverImg' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'rating' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'authors' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'summary' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'totalBooks' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetBooksQuery, GetBooksQueryVariables>;
export const GetBookDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBook' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'bookId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'book' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'bookId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'series' } },
                { kind: 'Field', name: { kind: 'Name', value: 'numberInSeries' } },
                { kind: 'Field', name: { kind: 'Name', value: 'language' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isbn' } },
                { kind: 'Field', name: { kind: 'Name', value: 'coverImg' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rating' } },
                { kind: 'Field', name: { kind: 'Name', value: 'numRatings' } },
                { kind: 'Field', name: { kind: 'Name', value: 'characters' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bookFormat' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publishDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'awards' } },
                { kind: 'Field', name: { kind: 'Name', value: 'setting' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'publisher' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'genres' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'authors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetBookQuery, GetBookQueryVariables>;
export const GetRandomBookDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRandomBook' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'randomBook' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetRandomBookQuery, GetRandomBookQueryVariables>;
export const GetAuthorsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAuthors' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authors' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAuthorsQuery, GetAuthorsQueryVariables>;
export const GetGenresDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetGenres' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'genres' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetGenresQuery, GetGenresQueryVariables>;
export const GetPublishersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPublishers' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'publishers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPublishersQuery, GetPublishersQueryVariables>;
export const QueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Query' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stats' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalBooks' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalAuthors' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalRatings' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
