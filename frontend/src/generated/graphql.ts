import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  pagination: PaginationInfo;
};

export type Genre = {
  __typename?: 'Genre';
  /** Name of the genre */
  name: Scalars['ID']['output'];
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
  /** Retrieve a list of books with optional filters */
  books: BookPagination;
  /** Retrieve a list of genres */
  genres: Array<Genre>;
  /** Retrieve a list of publishers */
  publishers: Array<Publisher>;
};


export type QueryBooksArgs = {
  afterDate?: InputMaybe<Scalars['Date']['input']>;
  authors?: InputMaybe<Array<Scalars['ID']['input']>>;
  beforeDate?: InputMaybe<Scalars['Date']['input']>;
  genres?: InputMaybe<Array<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SortByInput>;
  publishers?: InputMaybe<Array<Scalars['ID']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type SortByInput = {
  /** Sort books by the name of the primary author */
  authorName?: InputMaybe<SortOrder>;
  /** Sort books by their name */
  bookName?: InputMaybe<SortOrder>;
  /** Sort books by the publish date */
  publisherName?: InputMaybe<SortOrder>;
};

export enum SortOrder {
  /** Sort in ascending order */
  Asc = 'asc',
  /** Sort in descending order */
  Desc = 'desc'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Author: ResolverTypeWrapper<Author>;
  Book: ResolverTypeWrapper<Book>;
  BookPagination: ResolverTypeWrapper<BookPagination>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Genre: ResolverTypeWrapper<Genre>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  PaginationInfo: ResolverTypeWrapper<PaginationInfo>;
  Publisher: ResolverTypeWrapper<Publisher>;
  Query: ResolverTypeWrapper<{}>;
  SortByInput: SortByInput;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: Author;
  Book: Book;
  BookPagination: BookPagination;
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  Genre: Genre;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  PaginationInfo: PaginationInfo;
  Publisher: Publisher;
  Query: {};
  SortByInput: SortByInput;
  String: Scalars['String']['output'];
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  name?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  authors?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType>;
  awards?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  bookFormat?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  characters?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  coverImg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['Genre']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isbn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  numRatings?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numberInSeries?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  publishDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes['Publisher'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  series?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  setting?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookPaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookPagination'] = ResolversParentTypes['BookPagination']> = {
  books?: Resolver<Array<ResolversTypes['Book']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GenreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']> = {
  name?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginationInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginationInfo'] = ResolversParentTypes['PaginationInfo']> = {
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isLastPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublisherResolvers<ContextType = any, ParentType extends ResolversParentTypes['Publisher'] = ResolversParentTypes['Publisher']> = {
  name?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  authors?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType>;
  books?: Resolver<ResolversTypes['BookPagination'], ParentType, ContextType, Partial<QueryBooksArgs>>;
  genres?: Resolver<Array<ResolversTypes['Genre']>, ParentType, ContextType>;
  publishers?: Resolver<Array<ResolversTypes['Publisher']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  BookPagination?: BookPaginationResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Genre?: GenreResolvers<ContextType>;
  PaginationInfo?: PaginationInfoResolvers<ContextType>;
  Publisher?: PublisherResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

