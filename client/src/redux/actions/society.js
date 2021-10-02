import {gql} from '@apollo/client';
import apolloClient from '../../utils/apollo-client';
import {
  SET_ALERT,
  SOCIETY_API_CALL_FAILED,
  SOCIETY_API_CALL_TRIGGERED,
  SOCIETY_LOG_LOADED,
} from './types';
export const getSocietyLogs = _ => async dispatch => {
  dispatch({
    type: SOCIETY_API_CALL_TRIGGERED,
  });
  const query = gql`
    query getSocietyLogs($page_number: Int!, $page_size: Int!) {
      getSocietyLogs(page_number: $page_number, page_size: $page_size) {
        logs {
          _id
          kind
          fee {
            _id
            amount
            date
            description
          }
        }
        logs_count
      }
    }
  `;
  try {
    const res = await apolloClient.query({
      query: query,
      variables: {
        page_number: 0,
        page_size: 50,
      },
    });

    dispatch({
      type: SOCIETY_LOG_LOADED,
      payload: res.data?.getSocietyLogs,
    });
  } catch (e) {
    // console.log(e);
    dispatch({type: SOCIETY_API_CALL_FAILED});
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};
