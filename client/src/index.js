import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from 'apollo-link-error'
import Notifications, {notify} from 'react-notify-toast';
import { ChakraProvider } from "@chakra-ui/react";

import dotenv from 'dotenv';
// import './index.css';
import App from './App';
// import * as serviceWorker from "./serviceWorker";

dotenv.config();

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => notify.show(message, 'error'))
})
// TODO fix the .env client side
const httpLink = createHttpLink({ uri: 'http://localhost:4300/graphql' });
// const httpLink = createHttpLink({ uri: `http://localhost:${process.env.PORT_SERVER}/graphql` });
const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <Notifications />
      <App />
    </ChakraProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
