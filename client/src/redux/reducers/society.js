import {
  RESET_REFINEMENT_STATE,
  SOCIETY_API_CALL_TRIGGERED,
  SOCIETY_LOADED,
  SOCIETY_LOG_LOADED,
  SOCIETY_MEMBERS_LOADED,
  SOCIETY_MEMBERS_UPDATED,
  SOCIETY_REFINMENT_FEE_ADDED,
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
    case RESET_REFINEMENT_STATE:
      return {...state, isRefinementDone: false};
    case SOCIETY_API_CALL_TRIGGERED:
      return {...state, isLoading: true};
    default:
      return state;
  }
}
