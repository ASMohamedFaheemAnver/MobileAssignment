import {
  MEMBER_ADDED,
  RESET_DONATION_STATE,
  RESET_EXTRA_FEE_STATE,
  RESET_MONTHLY_FEE_STATE,
  RESET_OTHER_EXPENSE_STATE,
  RESET_REFINEMENT_STATE,
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
} from '../actions/types';

const initialState = {
  isLoading: false,
  societyLogs: {
    logs: [],
    logs_count: 0,
  },
  society: null,
  societyMembers: [],
  isRefinementDone: false,
  isDonationDone: false,
  isOtherExpenseDone: false,
  isExtraFeeDone: false,
  isMonthlyFeeDone: false,
};
export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case SOCIETY_LOG_LOADED:
      return {...state, isLoading: false, societyLogs: payload};
    case SOCIETY_MEMBERS_LOADED:
      return {...state, isLoading: false, societyMembers: payload};
    case SOCIETY_MEMBERS_UPDATED:
      return {
        ...state,
        isLoading: false,
        societyMembers: state.societyMembers.map(member => {
          if (member._id == payload._id) {
            return payload;
          }
          return member;
        }),
      };
    case SOCIETY_LOADED:
      return {
        ...state,
        isLoading: false,
        society: payload,
      };
    case MEMBER_ADDED:
      return {
        ...state,
        isLoading: false,
        societyMembers: [...state.societyMembers, payload],
      };
    case SOCIETY_REFINMENT_FEE_ADDED:
      return {
        ...state,
        isLoading: false,
        isRefinementDone: true,
        societyLogs: {
          logs: [payload, ...state.societyLogs.logs],
          logs_count: state.societyLogs.logs_count + 1,
        },
      };
    case SOCIETY_DONATION_ADDED:
      return {
        ...state,
        isLoading: false,
        isDonationDone: true,
        societyLogs: {
          logs: [payload, ...state.societyLogs.logs],
          logs_count: state.societyLogs.logs_count + 1,
        },
      };
    case SOCIETY_OTHER_EXPENSE_ADDED:
      return {
        ...state,
        isLoading: false,
        isOtherExpenseDone: true,
        societyLogs: {
          logs: [payload, ...state.societyLogs.logs],
          logs_count: state.societyLogs.logs_count + 1,
        },
      };
    case SOCIETY_EXTRA_FEE_ADDED:
      return {
        ...state,
        isLoading: false,
        isExtraFeeDone: true,
        societyLogs: {
          logs: [payload, ...state.societyLogs.logs],
          logs_count: state.societyLogs.logs_count + 1,
        },
      };
    case SOCIETY_FEE_UPDATED:
      return {
        ...state,
        isLoading: false,
        isMonthlyFeeDone: true,
        isExtraFeeDone: true,
        societyLogs: {
          logs: state.societyLogs.logs.map(log => {
            if (log._id == payload._id) {
              return payload;
            }
            return log;
          }),
          logs_count: state.societyLogs.logs_count + 1,
        },
      };
    case SOCIETY_MONTHLY_FEE_ADDED:
      return {
        ...state,
        isLoading: false,
        isMonthlyFeeDone: true,
        societyLogs: {
          logs: [payload, ...state.societyLogs.logs],
          logs_count: state.societyLogs.logs_count + 1,
        },
      };
    case SOCIETY_TRACK_UPDATED: {
      return {
        ...state,
        isLoading: false,
        societyLogs: {
          ...state.societyLogs,
          logs: state.societyLogs.logs.map(log => {
            if (log._id == payload.log_id) {
              return {
                ...log,
                fee: {
                  ...log.fee,
                  tracks: log.fee.tracks.map(track => {
                    if (track._id == payload.track_id) {
                      return {
                        ...track,
                        is_paid: payload.is_paid,
                      };
                    }
                    return track;
                  }),
                },
              };
            }
            return log;
          }),
        },
      };
    }
    case RESET_MONTHLY_FEE_STATE:
      return {...state, isMonthlyFeeDone: false};
    case RESET_EXTRA_FEE_STATE:
      return {...state, isExtraFeeDone: false};
    case RESET_OTHER_EXPENSE_STATE:
      return {...state, isOtherExpenseDone: false};
    case RESET_REFINEMENT_STATE:
      return {...state, isRefinementDone: false};
    case RESET_DONATION_STATE:
      return {...state, isDonationDone: false};
    case SOCIETY_API_CALL_TRIGGERED:
      return {...state, isLoading: true};
    default:
      return state;
  }
}
