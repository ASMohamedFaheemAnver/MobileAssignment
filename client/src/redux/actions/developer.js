import {gql} from '@apollo/client';
import apolloClient from '../../utils/apollo-client';
import {
  ALL_SOCIETY_LOADED,
  DEVELOPER_API_CALL_FAILED,
  DEVELOPER_API_CALL_TRIGGERED,
  SET_ALERT,
  SOCIETY_UPDATED,
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

export const approveSociety = societyId => async dispatch => {
  // dispatch({
  //   type: DEVELOPER_API_CALL_TRIGGERED,
  // });
  const mutation = gql`
    mutation approveSociety($societyId: String!) {
      approveSociety(societyId: $societyId) {
        _id
        name
        email
        phoneNumber
        approved
      }
    }
  `;
  try {
    const res = await apolloClient.mutate({
      mutation: mutation,
      variables: {
        societyId,
      },
    });

    dispatch({
      type: SOCIETY_UPDATED,
      payload: res.data?.approveSociety,
    });
  } catch (e) {
    // console.log(e);
    // dispatch({type: DEVELOPER_API_CALL_FAILED});
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};

export const disApproveSociety = societyId => async dispatch => {
  // dispatch({
  //   type: DEVELOPER_API_CALL_TRIGGERED,
  // });
  const mutation = gql`
    mutation disApproveSociety($societyId: String!) {
      disApproveSociety(societyId: $societyId) {
        _id
        name
        email
        phoneNumber
        approved
      }
    }
  `;
  try {
    const res = await apolloClient.mutate({
      mutation: mutation,
      variables: {
        societyId,
      },
    });

    dispatch({
      type: SOCIETY_UPDATED,
      payload: res.data?.disApproveSociety,
    });
  } catch (e) {
    // console.log(e);
    // dispatch({type: DEVELOPER_API_CALL_FAILED});
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};

export const removeSocietyMember = societyId => async dispatch => {
  // dispatch({
  //   type: DEVELOPER_API_CALL_TRIGGERED,
  // });
  const mutation = gql`
    mutation removeSocietyMember($societyId: String!) {
      removeSocietyMember(societyId: $societyId) {
        message
      }
    }
  `;
  try {
    const res = await apolloClient.mutate({
      mutation: mutation,
      variables: {
        societyId,
      },
    });

    dispatch({
      type: SOCIETY_UPDATED,
      payload: res.data?.disApproveSociety,
    });
  } catch (e) {
    // console.log(e);
    // dispatch({type: DEVELOPER_API_CALL_FAILED});
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};
