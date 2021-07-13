import { ApolloClient, InMemoryCache } from "@apollo/client";

export const colors = {
  primary: '#d25',
  black: '#000',
  white: '#fff',
  dark: '#212121',
  lightGrey: '#ccc'
};

export const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

export const icons = {
  close: 'close'
};