import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import * as types from './graphql';

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
  '\n  mutation CreateReview($input: CreateReviewInput!) {\n    createReview(input: $input) {\n      rating\n    }\n  }\n':
    types.CreateReviewDocument,
  '\n  mutation UpdateReview($input: UpdateReviewInput!) {\n    updateReview(input: $input) {\n      rating\n    }\n  }\n':
    types.UpdateReviewDocument,
  '\n  mutation CreateUser {\n    createUser {\n      UUID\n      name\n      at\n      wantToRead {\n        id\n      }\n      haveRead {\n        id\n      }\n    }\n  }\n':
    types.CreateUserDocument,
  '\n  query GetBooks($limit: Int, $offset: Int, $search: String, $sortInput: SortInput, $authors: [String!], $genres: [String!], $publishers: [String!]) {\n    books(limit: $limit, offset: $offset, search: $search, sortInput: $sortInput, authors: $authors, genres: $genres, publishers: $publishers) {\n      books {\n        id\n        title\n        coverImg\n        rating\n        authors {\n          name\n        }\n      }\n      summary {\n        totalBooks\n      }\n    }\n  }\n':
    types.GetBooksDocument,
  '\n  query GetBook($bookId: String!) {\n    book(id: $bookId) {\n      id\n      title\n      series\n      numberInSeries\n      language\n      isbn\n      coverImg\n      rating\n      numRatings\n      characters\n      bookFormat\n      pages\n      publishDate\n      awards\n      setting\n      publisher {\n        name\n      }\n      genres {\n        name\n      }\n      authors {\n        name\n      }\n      description\n    }\n  }\n':
    types.GetBookDocument,
  '\n  query GetRandomBook {\n    randomBook {\n      id\n    }\n  }\n':
    types.GetRandomBookDocument,
  '\n  query GetAuthors {\n    authors {\n      name\n    }\n  }\n': types.GetAuthorsDocument,
  '\n  query GetGenres {\n    genres {\n      name\n    }\n  }\n': types.GetGenresDocument,
  '\n  query GetPublishers {\n    publishers {\n      name\n    }\n  }\n':
    types.GetPublishersDocument,
  '\n  query Query {\n    stats {\n      totalBooks\n      totalAuthors\n      totalRatings\n    }\n  }\n':
    types.QueryDocument,
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
export function gql(
  source: '\n  mutation CreateReview($input: CreateReviewInput!) {\n    createReview(input: $input) {\n      rating\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateReview($input: CreateReviewInput!) {\n    createReview(input: $input) {\n      rating\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateReview($input: UpdateReviewInput!) {\n    updateReview(input: $input) {\n      rating\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateReview($input: UpdateReviewInput!) {\n    updateReview(input: $input) {\n      rating\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateUser {\n    createUser {\n      UUID\n      name\n      at\n      wantToRead {\n        id\n      }\n      haveRead {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateUser {\n    createUser {\n      UUID\n      name\n      at\n      wantToRead {\n        id\n      }\n      haveRead {\n        id\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetBooks($limit: Int, $offset: Int, $search: String, $sortInput: SortInput, $authors: [String!], $genres: [String!], $publishers: [String!]) {\n    books(limit: $limit, offset: $offset, search: $search, sortInput: $sortInput, authors: $authors, genres: $genres, publishers: $publishers) {\n      books {\n        id\n        title\n        coverImg\n        rating\n        authors {\n          name\n        }\n      }\n      summary {\n        totalBooks\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetBooks($limit: Int, $offset: Int, $search: String, $sortInput: SortInput, $authors: [String!], $genres: [String!], $publishers: [String!]) {\n    books(limit: $limit, offset: $offset, search: $search, sortInput: $sortInput, authors: $authors, genres: $genres, publishers: $publishers) {\n      books {\n        id\n        title\n        coverImg\n        rating\n        authors {\n          name\n        }\n      }\n      summary {\n        totalBooks\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetBook($bookId: String!) {\n    book(id: $bookId) {\n      id\n      title\n      series\n      numberInSeries\n      language\n      isbn\n      coverImg\n      rating\n      numRatings\n      characters\n      bookFormat\n      pages\n      publishDate\n      awards\n      setting\n      publisher {\n        name\n      }\n      genres {\n        name\n      }\n      authors {\n        name\n      }\n      description\n    }\n  }\n'
): (typeof documents)['\n  query GetBook($bookId: String!) {\n    book(id: $bookId) {\n      id\n      title\n      series\n      numberInSeries\n      language\n      isbn\n      coverImg\n      rating\n      numRatings\n      characters\n      bookFormat\n      pages\n      publishDate\n      awards\n      setting\n      publisher {\n        name\n      }\n      genres {\n        name\n      }\n      authors {\n        name\n      }\n      description\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetRandomBook {\n    randomBook {\n      id\n    }\n  }\n'
): (typeof documents)['\n  query GetRandomBook {\n    randomBook {\n      id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAuthors {\n    authors {\n      name\n    }\n  }\n'
): (typeof documents)['\n  query GetAuthors {\n    authors {\n      name\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetGenres {\n    genres {\n      name\n    }\n  }\n'
): (typeof documents)['\n  query GetGenres {\n    genres {\n      name\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPublishers {\n    publishers {\n      name\n    }\n  }\n'
): (typeof documents)['\n  query GetPublishers {\n    publishers {\n      name\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Query {\n    stats {\n      totalBooks\n      totalAuthors\n      totalRatings\n    }\n  }\n'
): (typeof documents)['\n  query Query {\n    stats {\n      totalBooks\n      totalAuthors\n      totalRatings\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
