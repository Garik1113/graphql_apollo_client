import React from "react";
import "./App.css";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-boost";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Todos />
      <AddTodo />
    </ApolloProvider>
  );
}

export default App;
