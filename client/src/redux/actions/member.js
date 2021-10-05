import {gql} from '@apollo/client';
import apolloClient from '../../utils/apollo-client';
import {
  MEMBERS_LOADED,
  MEMBER_API_CALL_FAILED,
  MEMBER_API_CALL_TRIGGERED,
  MEMBER_LOADED,
  MEMBER_LOG_ADDED,
  MEMBER_LOG_LOADED,
  RESET_DONATION_STATE,
  RESET_EXTRA_FEE_STATE,
  RESET_MONTHLY_FEE_STATE,
  RESET_OTHER_EXPENSE_STATE,
  RESET_REFINEMENT_STATE,
  SET_ALERT,
  SOCIETY_API_CALL_FAILED,
  SOCIETY_API_CALL_TRIGGERED,
  SOCIETY_DONATION_ADDED,
  SOCIETY_EXTRA_FEE_ADDED,
  SOCIETY_LOADED,
  SOCIETY_LOG_LOADED,
  SOCIETY_MEMBERS_LOADED,
  SOCIETY_MEMBERS_UPDATED,
  SOCIETY_MONTHLY_FEE_ADDED,
  SOCIETY_OTHER_EXPENSE_ADDED,
  SOCIETY_REFINMENT_FEE_ADDED,
} from './types';
export const getMemberLogs = _ => async dispatch => {
  dispatch({
    type: MEMBER_API_CALL_TRIGGERED,
  });
  const query = gql`
    query getMemberLogs($page_number: Int!, $page_size: Int!) {
      getMemberLogs(page_number: $page_number, page_size: $page_size) {
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
      type: MEMBER_LOG_LOADED,
      payload: res.data?.getMemberLogs,
    });
  } catch (e) {
    // console.log(e);
    dispatch({type: MEMBER_API_CALL_FAILED});
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};
export const getAllMembers = _ => async dispatch => {
  dispatch({
    type: SOCIETY_API_CALL_TRIGGERED,
  });
  const query = gql`
    query getAllSocietyMembers {
      getAllSocietyMembers {
        _id
        name
        email
        imageUrl
        address
        arrears
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
      type: MEMBERS_LOADED,
      payload: res.data?.getAllSocietyMembers,
    });
  } catch (e) {
    console.log(e);
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};

export const getMember = _ => async dispatch => {
  dispatch({
    type: MEMBER_API_CALL_TRIGGERED,
  });
  const query = gql`
    query getMember {
      getMember {
        _id
        name
        email
        imageUrl
        address
        phoneNumber
        arrears
      }
    }
  `;
  try {
    const res = await apolloClient.query({
      query: query,
    });

    dispatch({
      type: MEMBER_LOADED,
      payload: res.data?.getMember,
    });
  } catch (e) {
    // console.log(e);
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};

export const listenCommonMemberLog = () => async dispatch => {
  const subscription = gql`
    subscription listenCommonMemberLog {
      listenCommonMemberLog {
        log {
          _id
          kind
          fee {
            _id
            amount
            date
            description
          }
        }
        type
      }
    }
  `;
  try {
    apolloClient
      .subscribe({
        query: subscription,
      })
      .subscribe(res => {
        dispatch({
          type: MEMBER_LOG_ADDED,
          payload: res.data?.listenCommonMemberLog?.log,
        });
      });
  } catch (e) {
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};

export const listenMe = () => async dispatch => {
  const subscription = gql`
    subscription listenMe {
      listenMe {
        member {
          _id
          name
          email
          imageUrl
          address
          phoneNumber
          arrears
        }
      }
    }
  `;
  try {
    apolloClient
      .subscribe({
        query: subscription,
      })
      .subscribe(res => {
        dispatch({
          type: MEMBER_LOADED,
          payload: res.data?.listenMe?.member,
        });
      });
  } catch (e) {
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};
