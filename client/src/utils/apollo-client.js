import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APOLLO_HITPOINT_URL } from "../constants/api";

const httpLink = createHttpLink({
  uri: APOLLO_HITPOINT_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const apolloClient = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: "no-cache" },
    query: { fetchPolicy: "no-cache" },
    mutate: { fetchPolicy: "no-cache" },
  },
});

export default apolloClient;
