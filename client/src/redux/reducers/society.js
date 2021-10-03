import {
  SOCIETY_API_CALL_TRIGGERED,
  SOCIETY_LOG_LOADED,
  SOCIETY_MEMBERS_LOADED,
  SOCIETY_MEMBERS_UPDATED,
} from '../actions/types';

const initialState = {
  isLoading: false,
  societyLogs: {
    logs: [],
    logs_count: 0,
  },
  societyMembers: [],
};
export default function (state = initialState, action) {
  const {type, payload} = action;
  // console.log({type, payload});
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
    case SOCIETY_API_CALL_TRIGGERED:
      return {...state, isLoading: true};
    default:
      return state;
  }
}
