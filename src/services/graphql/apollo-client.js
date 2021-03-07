import { ApolloClient, InMemoryCache } from '@apollo/client';

// base graphql services
const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: new InMemoryCache(),
});

export default client;
