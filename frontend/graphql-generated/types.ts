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
  File: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID']['output'];
  link: Link;
  text: Scalars['String']['output'];
  user: User;
};

export type CommentConnectionResponse = {
  __typename?: 'CommentConnectionResponse';
  hasMore: Scalars['Boolean']['output'];
  nodes: Array<Comment>;
  totalCount: Scalars['Int']['output'];
};

export type CommentInput = {
  id: Scalars['String']['input'];
};

export type ConnectionInput = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateLinkInput = {
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Link = {
  __typename?: 'Link';
  category: Scalars['String']['output'];
  comments: Array<Comment>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Resource;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
  users: Array<User>;
};

export type LinkConnectionResponse = {
  __typename?: 'LinkConnectionResponse';
  hasMore: Scalars['Boolean']['output'];
  nodes: Array<Link>;
  totalCount: Scalars['Int']['output'];
};

export type LinkInput = {
  id: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLink?: Maybe<Link>;
  uploadResource?: Maybe<Resource>;
};


export type MutationCreateLinkArgs = {
  input: CreateLinkInput;
};


export type MutationUploadResourceArgs = {
  input: UploadResourceInput;
};

export type Query = {
  __typename?: 'Query';
  comment?: Maybe<Comment>;
  commentConnection: CommentConnectionResponse;
  link?: Maybe<Link>;
  linkConnection: LinkConnectionResponse;
  me?: Maybe<User>;
};


export type QueryCommentArgs = {
  input: CommentInput;
};


export type QueryCommentConnectionArgs = {
  input?: InputMaybe<ConnectionInput>;
};


export type QueryLinkArgs = {
  input: LinkInput;
};


export type QueryLinkConnectionArgs = {
  input?: InputMaybe<ConnectionInput>;
};

export type Resource = {
  __typename?: 'Resource';
  id: Scalars['ID']['output'];
  mimetype: Scalars['String']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type UploadResourceInput = {
  resource: Scalars['File']['input'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  bookmarks: Array<Link>;
  comments: Array<Comment>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  role: UserRole;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}
