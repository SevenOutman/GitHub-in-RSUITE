export type ApolloProps<Query> = {
  data: Query,
  loading: boolean,
  error: string
}