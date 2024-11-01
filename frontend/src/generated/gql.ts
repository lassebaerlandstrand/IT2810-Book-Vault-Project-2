/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetBooks($limit: Int, $offset: Int, $input: FilterInput, $sort: SortInput) {\n    books(limit: $limit, offset: $offset, input: $input, sortInput: $sort) {\n      books {\n        id\n        title\n        coverImg\n        rating\n        authors {\n          name\n        }\n      }\n      summary {\n        totalBooks\n      }\n    }\n  }\n": types.GetBooksDocument,
    "\n  query GetBook($bookId: String!) {\n    book(id: $bookId) {\n      id\n      title\n      series\n      numberInSeries\n      language\n      isbn\n      coverImg\n      rating\n      numRatings\n      characters\n      bookFormat\n      pages\n      publishDate\n      awards\n      setting\n      publisher {\n        name\n      }\n      genres {\n        name\n      }\n      authors {\n        name\n      }\n      description\n    }\n  }\n": types.GetBookDocument,
    "\n  query GetAuthors {\n    authors {\n      name\n    }\n  }\n": types.GetAuthorsDocument,
    "\n  query GetGenres {\n    genres {\n      name\n    }\n  }\n": types.GetGenresDocument,
    "\n  query GetPublishers {\n    publishers {\n      name\n    }\n  }\n": types.GetPublishersDocument,
    "\n  query GetFilterCount($input: FilterInput) {\n    filterCount(input: $input) {\n      authors {\n        name\n        count\n      }\n      genres {\n        name\n        count\n      }\n      publishers {\n        name\n        count\n      }\n      publishDates {\n        year\n        count\n      }\n      pages {\n        pages\n        count\n      }\n      ratings {\n        rating\n        count\n      }\n    }\n  }\n": types.GetFilterCountDocument,
    "\n  query GetDateSpan {\n    dateSpan {\n      earliest\n      latest\n    }\n  }\n": types.GetDateSpanDocument,
    "\n  query GetPageSpan {\n    pageSpan {\n      least\n      most\n    }\n  }\n": types.GetPageSpanDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBooks($limit: Int, $offset: Int, $input: FilterInput, $sort: SortInput) {\n    books(limit: $limit, offset: $offset, input: $input, sortInput: $sort) {\n      books {\n        id\n        title\n        coverImg\n        rating\n        authors {\n          name\n        }\n      }\n      summary {\n        totalBooks\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBooks($limit: Int, $offset: Int, $input: FilterInput, $sort: SortInput) {\n    books(limit: $limit, offset: $offset, input: $input, sortInput: $sort) {\n      books {\n        id\n        title\n        coverImg\n        rating\n        authors {\n          name\n        }\n      }\n      summary {\n        totalBooks\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBook($bookId: String!) {\n    book(id: $bookId) {\n      id\n      title\n      series\n      numberInSeries\n      language\n      isbn\n      coverImg\n      rating\n      numRatings\n      characters\n      bookFormat\n      pages\n      publishDate\n      awards\n      setting\n      publisher {\n        name\n      }\n      genres {\n        name\n      }\n      authors {\n        name\n      }\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetBook($bookId: String!) {\n    book(id: $bookId) {\n      id\n      title\n      series\n      numberInSeries\n      language\n      isbn\n      coverImg\n      rating\n      numRatings\n      characters\n      bookFormat\n      pages\n      publishDate\n      awards\n      setting\n      publisher {\n        name\n      }\n      genres {\n        name\n      }\n      authors {\n        name\n      }\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAuthors {\n    authors {\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetAuthors {\n    authors {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetGenres {\n    genres {\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetGenres {\n    genres {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPublishers {\n    publishers {\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetPublishers {\n    publishers {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFilterCount($input: FilterInput) {\n    filterCount(input: $input) {\n      authors {\n        name\n        count\n      }\n      genres {\n        name\n        count\n      }\n      publishers {\n        name\n        count\n      }\n      publishDates {\n        year\n        count\n      }\n      pages {\n        pages\n        count\n      }\n      ratings {\n        rating\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFilterCount($input: FilterInput) {\n    filterCount(input: $input) {\n      authors {\n        name\n        count\n      }\n      genres {\n        name\n        count\n      }\n      publishers {\n        name\n        count\n      }\n      publishDates {\n        year\n        count\n      }\n      pages {\n        pages\n        count\n      }\n      ratings {\n        rating\n        count\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetDateSpan {\n    dateSpan {\n      earliest\n      latest\n    }\n  }\n"): (typeof documents)["\n  query GetDateSpan {\n    dateSpan {\n      earliest\n      latest\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPageSpan {\n    pageSpan {\n      least\n      most\n    }\n  }\n"): (typeof documents)["\n  query GetPageSpan {\n    pageSpan {\n      least\n      most\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;