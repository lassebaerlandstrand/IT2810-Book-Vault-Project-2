/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
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
  filterCounts: FilterCountResult;
  pagination: PaginationInfo;
  summary: BookSummary;
};

export type BookSummary = {
  __typename?: 'BookSummary';
  totalBooks: Scalars['Int']['output'];
};

export type DateSpan = {
  __typename?: 'DateSpan';
  /** Earliest publish date */
  earliest: Scalars['Date']['output'];
  /** Latest publish date */
  latest: Scalars['Date']['output'];
};

export type FilterCount = {
  __typename?: 'FilterCount';
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

/** Result of counting items for each filter */
export type FilterCountResult = {
  __typename?: 'FilterCountResult';
  authors: Array<FilterCount>;
  genres: Array<FilterCount>;
  pages: Array<PagesCount>;
  publishDates: Array<PublishDateCount>;
  publishers: Array<FilterCount>;
  ratings: Array<RatingCount>;
};

export type FilterInput = {
  afterDate?: InputMaybe<Scalars['Date']['input']>;
  authors?: InputMaybe<Array<Scalars['String']['input']>>;
  beforeDate?: InputMaybe<Scalars['Date']['input']>;
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  maxPages?: InputMaybe<Scalars['Int']['input']>;
  minPages?: InputMaybe<Scalars['Int']['input']>;
  minRating?: InputMaybe<Scalars['Int']['input']>;
  publishers?: InputMaybe<Array<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Genre = {
  __typename?: 'Genre';
  /** Name of the genre */
  name: Scalars['ID']['output'];
};

export type PageSpan = {
  __typename?: 'PageSpan';
  /** Minimum number of pages */
  least: Scalars['Int']['output'];
  /** Maximum number of pages */
  most: Scalars['Int']['output'];
};

export type PagesCount = {
  __typename?: 'PagesCount';
  count: Scalars['Int']['output'];
  pages: Scalars['Int']['output'];
};

/** General pagination information */
export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  currentPage: Scalars['Int']['output'];
  isLastPage: Scalars['Boolean']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PublishDateCount = {
  __typename?: 'PublishDateCount';
  count: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
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
  /** Retrieve a list of books with optional filters */
  books: BookPagination;
  /** Retrieve the span of publish dates */
  dateSpan: DateSpan;
  /** Retrieve the amount of books meeting current filters and the new one */
  filterCount: FilterCountResult;
  /** Retrieve a list of genres */
  genres: Array<Genre>;
  /** Retrieve the span of number of pages */
  pageSpan: PageSpan;
  /** Retrieve a list of publishers */
  publishers: Array<Publisher>;
};


export type QueryBookArgs = {
  id: Scalars['String']['input'];
};


export type QueryBooksArgs = {
  input?: InputMaybe<FilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortInput?: InputMaybe<SortInput>;
};


export type QueryFilterCountArgs = {
  input?: InputMaybe<FilterInput>;
};

export type RatingCount = {
  __typename?: 'RatingCount';
  count: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
};

export enum SortBy {
  /** Sort by author name */
  AuthorName = 'authorName',
  /** Sort by book name */
  BookName = 'bookName',
  /** Sort by publisher name */
  PublisherName = 'publisherName'
}

export type SortInput = {
  sortBy: SortBy;
  sortOrder: SortOrder;
};

export enum SortOrder {
  /** Sort in ascending order */
  Asc = 'asc',
  /** Sort in descending order */
  Desc = 'desc'
}

export type GetBooksQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  input?: InputMaybe<FilterInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type GetBooksQuery = { __typename?: 'Query', books: { __typename?: 'BookPagination', books: Array<{ __typename?: 'Book', id: string, title: string, coverImg: string, rating: number, authors: Array<{ __typename?: 'Author', name: string }> }>, summary: { __typename?: 'BookSummary', totalBooks: number } } };

export type GetBookQueryVariables = Exact<{
  bookId: Scalars['String']['input'];
}>;


export type GetBookQuery = { __typename?: 'Query', book: { __typename?: 'Book', id: string, title: string, series?: string | null, numberInSeries?: number | null, language: string, isbn: string, coverImg: string, rating: number, numRatings: number, characters?: Array<string> | null, bookFormat: string, pages: number, publishDate: any, awards?: Array<string> | null, setting?: Array<string> | null, description: string, publisher: { __typename?: 'Publisher', name: string }, genres: Array<{ __typename?: 'Genre', name: string }>, authors: Array<{ __typename?: 'Author', name: string }> } };

export type GetAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorsQuery = { __typename?: 'Query', authors: Array<{ __typename?: 'Author', name: string }> };

export type GetGenresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGenresQuery = { __typename?: 'Query', genres: Array<{ __typename?: 'Genre', name: string }> };

export type GetPublishersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublishersQuery = { __typename?: 'Query', publishers: Array<{ __typename?: 'Publisher', name: string }> };

export type GetFilterCountQueryVariables = Exact<{
  input?: InputMaybe<FilterInput>;
}>;


export type GetFilterCountQuery = { __typename?: 'Query', filterCount: { __typename?: 'FilterCountResult', authors: Array<{ __typename?: 'FilterCount', name: string, count: number }>, genres: Array<{ __typename?: 'FilterCount', name: string, count: number }>, publishers: Array<{ __typename?: 'FilterCount', name: string, count: number }>, publishDates: Array<{ __typename?: 'PublishDateCount', year: number, count: number }>, pages: Array<{ __typename?: 'PagesCount', pages: number, count: number }>, ratings: Array<{ __typename?: 'RatingCount', rating: number, count: number }> } };

export type GetDateSpanQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDateSpanQuery = { __typename?: 'Query', dateSpan: { __typename?: 'DateSpan', earliest: any, latest: any } };

export type GetPageSpanQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPageSpanQuery = { __typename?: 'Query', pageSpan: { __typename?: 'PageSpan', least: number, most: number } };


export const GetBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"books"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"coverImg"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"summary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalBooks"}}]}}]}}]}}]} as unknown as DocumentNode<GetBooksQuery, GetBooksQueryVariables>;
export const GetBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"book"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"numberInSeries"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"isbn"}},{"kind":"Field","name":{"kind":"Name","value":"coverImg"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"numRatings"}},{"kind":"Field","name":{"kind":"Name","value":"characters"}},{"kind":"Field","name":{"kind":"Name","value":"bookFormat"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"publishDate"}},{"kind":"Field","name":{"kind":"Name","value":"awards"}},{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetBookQuery, GetBookQueryVariables>;
export const GetAuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuthors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAuthorsQuery, GetAuthorsQueryVariables>;
export const GetGenresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGenres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetGenresQuery, GetGenresQueryVariables>;
export const GetPublishersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublishers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetPublishersQuery, GetPublishersQueryVariables>;
export const GetFilterCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFilterCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filterCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"publishers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"publishDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ratings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<GetFilterCountQuery, GetFilterCountQueryVariables>;
export const GetDateSpanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDateSpan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateSpan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"earliest"}},{"kind":"Field","name":{"kind":"Name","value":"latest"}}]}}]}}]} as unknown as DocumentNode<GetDateSpanQuery, GetDateSpanQueryVariables>;
export const GetPageSpanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPageSpan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageSpan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"least"}},{"kind":"Field","name":{"kind":"Name","value":"most"}}]}}]}}]} as unknown as DocumentNode<GetPageSpanQuery, GetPageSpanQueryVariables>;