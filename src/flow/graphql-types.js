// @flow

// Scalars
type Int = number;
type ID = string | Int;
type URI = string;
type String = string;


// Interfaces
type Node = {
  id: ID;
}

// Query
export type Query = {
  repository?: Repository
}

// Objects
export type PageInfo = {
  endCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
}

export type Actor = {
  avatarUrl: URI,
  login: string
}

export type RepositoryOwner = Node & Actor & {
  pinnedRepositories: RepositoryConnection,
  repository: Repository
}

export type User = RepositoryOwner & {
  followers: UserConnection,
  following: UserConnection,
  organizations: OrganizationConnection,
  repositories: RepositoryConnection,
  starredRepositories: RepositoryConnection,

  bio?: string,
  company?: string,
  email: string,
  isDeveloperProgramMember: boolean,
  location?: string,
  websiteUrl?: URI
}

export type Organization = RepositoryOwner & {
  members: UserConnection,

  description?: string,
  location?: string,
  name?: string,
  websiteUrl?: URI
}

export type Repository = Node & {
  forks: RepositoryConnection,
  issues: IssueConnection,
  stargazers: StargazerConnection,

  description?: string,
  name: string,
  nameWithOwner: string,
  primaryLanguage: Language,
}

export type Issue = Node & {
  title: string,
  number: Int
}

type Language = Node & {
  color?: string,
  name: string
}

// Connections
type UserEdge = {
  cursor: string,
  node?: User
}

type UserConnection = {
  edges: UserEdge[],
  nodes: User[],
  pageInfo: PageInfo,
  totalCount: Int
}

type OrganizationEdge = {
  cursor: string,
  node?: Organization
}

type OrganizationConnection = {
  edges: OrganizationEdge[],
  nodes: Organization[],
  pageInfo: PageInfo,
  totalCount: Int
}

type RepositoryEdge = {
  cursor: string,
  node: Repository
}

type RepositoryConnection = {
  edges: RepositoryEdge[],
  nodes: Repository[],
  pageInfo: PageInfo,
  totalCount: Int
}

type IssueEdge = {
  cursor: String,
  node: Issue
}

type IssueConnection = {
  edges: IssueEdge[],
  nodes: Issue[],
  pageInfo: PageInfo,
  totalCount: Int
}

type StargazerEdge = {
  cursor: string,
  node?: User
}

type StargazerConnection = {
  edges: StargazerEdge[],
  nodes: User[],
  pageInfo: PageInfo,
  totalCount: Int
}