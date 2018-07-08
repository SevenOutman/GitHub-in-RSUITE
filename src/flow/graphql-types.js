// @flow

// Scalars
type Int = number;
type ID = string | Int;
type URI = string;


// Interfaces
type Node = {
  id: ID;
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
  organizations: OrganizationConnection,

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
  stargazers: StargazerConnection,

  description?: string,
  name: string,
  nameWithOwner: string,
  primaryLanguage: Language,
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