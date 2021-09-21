import { ApolloClient, InMemoryCache } from "@apollo/client";
import { APOLLO_HITPOINT_URL } from "../constants/api";

const apolloClient = new ApolloClient({
  uri: APOLLO_HITPOINT_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: "no-cache" },
    query: { fetchPolicy: "no-cache" },
    mutate: { fetchPolicy: "no-cache" },
  },
});

export default apolloClient;
