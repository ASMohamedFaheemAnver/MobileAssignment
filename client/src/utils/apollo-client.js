import {ApolloClient, ApolloLink, InMemoryCache, split} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUploadLink} from 'apollo-upload-client';
import {APOLLO_HITPOINT_URL, APOLLO_WS_URL} from '../constants/api';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {SubscriptionClient} from 'subscriptions-transport-ws';

const httpLink = createUploadLink({
  uri: APOLLO_HITPOINT_URL,
});

const client = new SubscriptionClient(APOLLO_WS_URL, {
  reconnect: true,
  minTimeout: 55000,
});

client.use([
  {
    async applyMiddleware(operationOptions, next) {
      operationOptions.variables['Authorization'] = await AsyncStorage.getItem(
        'token',
      );
      next();
    },
  },
]);

const wsLink = new WebSocketLink(client);

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
  link: split(
    ({query}) => {
      const def = getMainDefinition(query);
      return (
        def.kind === 'OperationDefinition' && def.operation === 'subscription'
      );
    },
    wsLink,
    ApolloLink.from([errorLink, authLink, httpLink]),
  ),
  cache: new InMemoryCache({
    typePolicies: {
      Fee: {
        fields: {
          tracks: {
            merge(exsiting = [], incomming) {
              return [...incomming];
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {fetchPolicy: 'no-cache'},
    query: {fetchPolicy: 'no-cache'},
    mutate: {fetchPolicy: 'no-cache'},
  },
});

export default apolloClient;
