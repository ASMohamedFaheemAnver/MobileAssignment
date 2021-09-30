import {gql} from '@apollo/client';
import apolloClient from '../../utils/apollo-client';
import {
  ALL_SOCIETY_LOADED,
  DEVELOPER_API_CALL_FAILED,
  DEVELOPER_API_CALL_TRIGGERED,
  SET_ALERT,
} from './types';

export const getAllSocieties = _ => async dispatch => {
  dispatch({
    type: DEVELOPER_API_CALL_TRIGGERED,
  });
  const query = gql`
    query getAllSocieties {
      getAllSocieties {
        _id
        name
        email
        phoneNumber
        approved
      }
    }
  `;
  try {
    const res = await apolloClient.query({
      query: query,
    });

    dispatch({
      type: ALL_SOCIETY_LOADED,
      payload: res.data?.getAllSocieties,
    });
  } catch (e) {
    // console.log(e);
    dispatch({type: DEVELOPER_API_CALL_FAILED});
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};
