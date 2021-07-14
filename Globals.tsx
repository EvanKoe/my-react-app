import { ApolloClient, InMemoryCache } from "@apollo/client";

export const colors = {
  primary: '#d25',
  black: '#000',
  white: '#fff',
  dark: '#222',
  lightGrey: '#ccc',
  primaryLight: '#f47',
  primaryDark: '#b03'
};

export const client = new ApolloClient({
//uri: 'https://48p1r2roz4.sse.codesandbox.io',
//uri: 'https://graphqlzero.almansi.me/api',
  uri: 'https://www.dev.yabe.co/graphql',
  cache: new InMemoryCache()
});

export const icons = {
  close: 'close',
  swap: 'swap',
  cli: 'codesquareo'
};
