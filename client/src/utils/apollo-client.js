import {ApolloClient, ApolloLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUploadLink} from 'apollo-upload-client';
import {APOLLO_HITPOINT_URL} from '../constants/api';

const httpLink = createUploadLink({
  uri: APOLLO_HITPOINT_URL,
});

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (networkError) console.error(networkError);
  if (graphQLErrors) graphQLErrors.map(({message}) => console.error(message));
});

const apolloClient = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {fetchPolicy: 'no-cache'},
    query: {fetchPolicy: 'no-cache'},
    mutate: {fetchPolicy: 'no-cache'},
  },
});

export default apolloClient;
