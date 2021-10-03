import {gql} from '@apollo/client';
import apolloClient from '../../utils/apollo-client';
import {
  SET_ALERT,
  SOCIETY_API_CALL_FAILED,
  SOCIETY_API_CALL_TRIGGERED,
  SOCIETY_LOG_LOADED,
  SOCIETY_MEMBERS_LOADED,
  SOCIETY_MEMBERS_UPDATED,
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
export const getAllMembers = _ => async dispatch => {
  dispatch({
    type: SOCIETY_API_CALL_TRIGGERED,
  });
  const query = gql`
    query getAllMembers {
      getAllMembers {
        _id
        name
        email
        imageUrl
        address
        arrears
        approved
        donations
        phoneNumber
      }
    }
  `;
  try {
    const res = await apolloClient.query({
      query: query,
    });

    dispatch({
      type: SOCIETY_MEMBERS_LOADED,
      payload: res.data?.getAllMembers,
    });
  } catch (e) {
    console.log(e);
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};

export const approveMember = memberId => async dispatch => {
  // dispatch({
  //   type: DEVELOPER_API_CALL_TRIGGERED,
  // });
  const mutation = gql`
    mutation approveMember($memberId: String!) {
      approveMember(memberId: $memberId) {
        _id
        name
        email
        imageUrl
        address
        arrears
        approved
        donations
        phoneNumber
      }
    }
  `;
  try {
    const res = await apolloClient.mutate({
      mutation: mutation,
      variables: {
        memberId,
      },
    });

    dispatch({
      type: SOCIETY_MEMBERS_UPDATED,
      payload: res.data?.approveMember,
    });
  } catch (e) {
    // console.log(e);
    // dispatch({type: DEVELOPER_API_CALL_FAILED});
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};

export const disApproveMember = memberId => async dispatch => {
  // dispatch({
  //   type: DEVELOPER_API_CALL_TRIGGERED,
  // });
  const mutation = gql`
    mutation removeSocietyMember($member_id: ID!) {
      removeSocietyMember(member_id: $member_id) {
        _id
        name
        email
        imageUrl
        address
        arrears
        approved
        donations
        phoneNumber
      }
    }
  `;
  try {
    const res = await apolloClient.mutate({
      mutation: mutation,
      variables: {
        member_id: memberId,
      },
    });

    dispatch({
      type: SOCIETY_MEMBERS_UPDATED,
      payload: res.data?.removeSocietyMember,
    });
  } catch (e) {
    // console.log(e);
    // dispatch({type: DEVELOPER_API_CALL_FAILED});
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};
