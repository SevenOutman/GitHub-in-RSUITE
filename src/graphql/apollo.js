import ApolloClient from 'apollo-boost';
import token from './access-token';

export const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `token ${token}`
  }
});
