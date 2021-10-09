import {gql} from '@apollo/client';
import apolloClient from '../../utils/apollo-client';
import {
  MEMBER_ADDED,
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
  SOCIETY_FEE_UPDATED,
  SOCIETY_LOADED,
  SOCIETY_LOG_LOADED,
  SOCIETY_MEMBERS_LOADED,
  SOCIETY_MEMBERS_UPDATED,
  SOCIETY_MONTHLY_FEE_ADDED,
  SOCIETY_OTHER_EXPENSE_ADDED,
  SOCIETY_REFINMENT_FEE_ADDED,
  SOCIETY_TRACK_UPDATED,
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
            tracks {
              _id
              member {
                _id
                imageUrl
                name
              }
              is_paid
            }
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

export const getSociety = _ => async dispatch => {
  dispatch({
    type: SOCIETY_API_CALL_TRIGGERED,
  });
  const query = gql`
    query getSociety {
      getSociety {
        _id
        name
        email
        imageUrl
        address
        phoneNumber
        expected_income
        current_income
        number_of_members
      }
    }
  `;
  try {
    const res = await apolloClient.query({
      query: query,
    });

    dispatch({
      type: SOCIETY_LOADED,
      payload: res.data?.getSociety,
    });
  } catch (e) {
    // console.log(e);
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

export const makeFeePaidForOneMember = (track_id, log_id) => async dispatch => {
  const mutation = gql`
    mutation makeFeePaidForOneMember($track_id: ID!, $log_id: ID!) {
      makeFeePaidForOneMember(track_id: $track_id, log_id: $log_id) {
        message
      }
    }
  `;
  try {
    const res = await apolloClient.mutate({
      mutation: mutation,
      variables: {
        track_id,
        log_id,
      },
    });

    dispatch({
      type: SOCIETY_TRACK_UPDATED,
      payload: {log_id, track_id, is_paid: true},
    });
  } catch (e) {
    // console.log(e);
    // dispatch({type: DEVELOPER_API_CALL_FAILED});
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};

export const makeFeeUnPaidForOneMember =
  (track_id, log_id) => async dispatch => {
    const mutation = gql`
      mutation makeFeeUnPaidForOneMember($track_id: ID!, $log_id: ID!) {
        makeFeeUnPaidForOneMember(track_id: $track_id, log_id: $log_id) {
          message
        }
      }
    `;
    try {
      const res = await apolloClient.mutate({
        mutation: mutation,
        variables: {
          track_id,
          log_id,
        },
      });

      dispatch({
        type: SOCIETY_TRACK_UPDATED,
        payload: {log_id, track_id, is_paid: false},
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

export const addRefinementFeeForSociety =
  (refinementFee, description) => async dispatch => {
    // dispatch({
    //   type: DEVELOPER_API_CALL_TRIGGERED,
    // });
    const mutation = gql`
      mutation addRefinementFeeForSociety(
        $refinementFee: Int!
        $description: String!
      ) {
        addRefinementFeeForSociety(
          refinementFee: $refinementFee
          description: $description
        ) {
          _id
          kind
          fee {
            _id
            amount
            date
            description
            tracks {
              _id
              member {
                _id
                imageUrl
                name
              }
              is_paid
            }
          }
        }
      }
    `;
    try {
      const res = await apolloClient.mutate({
        mutation: mutation,
        variables: {
          refinementFee: parseInt(refinementFee),
          description,
        },
      });

      dispatch({
        type: SOCIETY_REFINMENT_FEE_ADDED,
        payload: res.data?.addRefinementFeeForSociety,
      });
    } catch (e) {
      // console.log(e);
      // dispatch({type: DEVELOPER_API_CALL_FAILED});
      dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
    }
  };

export const resetRefinementState = () => async dispatch => {
  dispatch({
    type: RESET_REFINEMENT_STATE,
  });
};

export const addReceivedDonationBySociety =
  (donation, description) => async dispatch => {
    dispatch({
      type: SOCIETY_API_CALL_TRIGGERED,
    });
    const mutation = gql`
      mutation addReceivedDonationBySociety(
        $donation: Int!
        $description: String!
      ) {
        addReceivedDonationBySociety(
          donationInput: {donation: $donation, description: $description}
        ) {
          _id
          kind
          fee {
            _id
            amount
            date
            description
            tracks {
              _id
              member {
                _id
                imageUrl
                name
              }
              is_paid
            }
          }
        }
      }
    `;
    try {
      const res = await apolloClient.mutate({
        mutation: mutation,
        variables: {
          donation: parseInt(donation),
          description,
        },
      });

      dispatch({
        type: SOCIETY_DONATION_ADDED,
        payload: res.data?.addReceivedDonationBySociety,
      });
    } catch (e) {
      // console.log(e);
      // dispatch({type: DEVELOPER_API_CALL_FAILED});
      dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
    }
  };

export const resetDonationState = () => async dispatch => {
  dispatch({
    type: RESET_DONATION_STATE,
  });
};

export const addOtherSocietyExpense =
  (expense, description) => async dispatch => {
    dispatch({
      type: SOCIETY_API_CALL_TRIGGERED,
    });
    const mutation = gql`
      mutation addOtherSocietyExpense($expense: Int!, $description: String!) {
        addOtherSocietyExpense(
          expenseInput: {expense: $expense, description: $description}
        ) {
          _id
          kind
          fee {
            _id
            amount
            date
            description
            tracks {
              _id
              member {
                _id
                imageUrl
                name
              }
              is_paid
            }
          }
        }
      }
    `;
    try {
      const res = await apolloClient.mutate({
        mutation: mutation,
        variables: {
          expense: parseInt(expense),
          description,
        },
      });

      dispatch({
        type: SOCIETY_OTHER_EXPENSE_ADDED,
        payload: res.data?.addOtherSocietyExpense,
      });
    } catch (e) {
      // console.log(e);
      // dispatch({type: DEVELOPER_API_CALL_FAILED});
      dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
    }
  };

export const resetOtherExpenseState = () => async dispatch => {
  dispatch({
    type: RESET_OTHER_EXPENSE_STATE,
  });
};

export const addMonthlyFeeToEveryone =
  (monthlyFee, description) => async dispatch => {
    dispatch({
      type: SOCIETY_API_CALL_TRIGGERED,
    });
    const mutation = gql`
      mutation addMonthlyFeeToEveryone(
        $monthlyFee: Int!
        $description: String!
      ) {
        addMonthlyFeeToEveryone(
          monthlyFee: $monthlyFee
          description: $description
        ) {
          _id
          kind
          fee {
            _id
            amount
            date
            description
            tracks {
              _id
              member {
                _id
                imageUrl
                name
              }
              is_paid
            }
          }
        }
      }
    `;
    try {
      const res = await apolloClient.mutate({
        mutation: mutation,
        variables: {
          monthlyFee: parseInt(monthlyFee),
          description,
        },
      });

      dispatch({
        type: SOCIETY_MONTHLY_FEE_ADDED,
        payload: res.data?.addMonthlyFeeToEveryone,
      });
    } catch (e) {
      // console.log(e);
      // dispatch({type: DEVELOPER_API_CALL_FAILED});
      dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
    }
  };

export const resetMonthlyFeeState = () => async dispatch => {
  dispatch({
    type: RESET_MONTHLY_FEE_STATE,
  });
};

export const addExtraFeeToEveryone =
  (extraFee, description) => async dispatch => {
    dispatch({
      type: SOCIETY_API_CALL_TRIGGERED,
    });
    const mutation = gql`
      mutation addExtraFeeToEveryone($extraFee: Int!, $description: String!) {
        addExtraFeeToEveryone(extraFee: $extraFee, description: $description) {
          _id
          kind
          fee {
            _id
            amount
            date
            description
            tracks {
              _id
              member {
                _id
                imageUrl
                name
              }
              is_paid
            }
          }
        }
      }
    `;
    try {
      const res = await apolloClient.mutate({
        mutation: mutation,
        variables: {
          extraFee: parseInt(extraFee),
          description,
        },
      });

      dispatch({
        type: SOCIETY_EXTRA_FEE_ADDED,
        payload: res.data?.addExtraFeeToEveryone,
      });
    } catch (e) {
      // console.log(e);
      // dispatch({type: DEVELOPER_API_CALL_FAILED});
      dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
    }
  };

export const editFeeForEveryone =
  (log_id, fee, description) => async dispatch => {
    dispatch({
      type: SOCIETY_API_CALL_TRIGGERED,
    });
    const mutation = gql`
      mutation editFeeForEveryone(
        $log_id: ID!
        $fee: Int!
        $description: String!
      ) {
        editFeeForEveryone(
          log_id: $log_id
          fee: $fee
          description: $description
        ) {
          _id
          kind
          fee {
            _id
            amount
            date
            description
            tracks {
              _id
              member {
                _id
                imageUrl
                name
              }
              is_paid
            }
          }
        }
      }
    `;
    try {
      const res = await apolloClient.mutate({
        mutation: mutation,
        variables: {
          log_id: log_id,
          fee: parseInt(fee),
          description,
        },
      });

      dispatch({
        type: SOCIETY_FEE_UPDATED,
        payload: res.data?.editFeeForEveryone,
      });
    } catch (e) {
      // console.log(e);
      // dispatch({type: DEVELOPER_API_CALL_FAILED});
      dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
    }
  };

export const resetExtraFeeState = () => async dispatch => {
  dispatch({
    type: RESET_EXTRA_FEE_STATE,
  });
};

let listenSocietySubscription;

export const listenSociety = () => async dispatch => {
  const subscription = gql`
    subscription listenSociety {
      listenSociety {
        society {
          _id
          name
          email
          imageUrl
          address
          phoneNumber
          expected_income
          current_income
          number_of_members
        }
      }
    }
  `;
  try {
    listenSocietySubscription = apolloClient
      .subscribe({
        query: subscription,
      })
      .subscribe(res => {
        // console.log({res: res.data?.listenSociety});
        dispatch({
          type: SOCIETY_LOADED,
          payload: res.data?.listenSociety?.society,
        });
      });

    // dispatch({
    //   type: SOCIETY_EXTRA_FEE_ADDED,
    //   payload: res.data?.addExtraFeeToEveryone,
    // });
  } catch (e) {
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};

export const unSubscribelistenSociety = () => async dispatch => {
  listenSocietySubscription.unsubscribe();
};

let listenSocietyMembersBySocietySubscription;

export const listenSocietyMembersBySociety = () => async dispatch => {
  const subscription = gql`
    subscription listenSocietyMembersBySociety {
      listenSocietyMembersBySociety {
        member {
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
    }
  `;
  try {
    listenSocietyMembersBySocietySubscription = apolloClient
      .subscribe({
        query: subscription,
      })
      .subscribe(res => {
        // console.log({res: res.data?.listenSocietyMembersBySociety});
        dispatch({
          type: MEMBER_ADDED,
          payload: res.data?.listenSocietyMembersBySociety?.member,
        });
      });
  } catch (e) {
    dispatch({type: SET_ALERT, payload: e?.graphQLErrors});
  }
};

export const unsubscribeListenSocietyMembersBySociety =
  () => async dispatch => {
    listenSocietyMembersBySocietySubscription.unsubscribe();
  };
