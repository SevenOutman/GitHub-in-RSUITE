import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost';
import token from './access-token';

export async function createClient() {
  return fetch(`https://api.github.com/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${token}`
    },
    body: JSON.stringify({
      query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
    })
  })
    .then(result => result.json())
    .then(({ data }) => {
      // here we're filtering out any type information unrelated to unions or interfaces
      data.__schema.types = data.__schema.types.filter(
        type => type.possibleTypes !== null
      );
      return new ApolloClient({
        uri: 'https://api.github.com/graphql',
        headers: {
          Authorization: `token ${token}`
        },
        cache: new InMemoryCache({
          fragmentMatcher: new IntrospectionFragmentMatcher({ introspectionQueryResultData: data })
        })
      });
    });

}