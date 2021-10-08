import {
  MEMBERS_LOADED,
  MEMBER_LOADED,
  MEMBER_LOG_ADDED,
  MEMBER_LOG_LOADED,
  MEMBER_LOG_UPDATED,
} from '../actions/types';

const initialState = {
  isLoading: false,
  memberLogs: {
    logs: [],
    logs_count: 0,
  },
  member: null,
  societyMembers: [],
};
export default function (state = initialState, action) {
  const {type, payload} = action;
  // console.log({type, payload});
  switch (type) {
    case MEMBER_LOG_LOADED:
      return {...state, isLoading: false, memberLogs: payload};
    case MEMBER_LOG_ADDED:
      return {
        ...state,
        isLoading: false,
        memberLogs: {
          logs_count: state.memberLogs.logs_count + 1,
          logs: [payload, ...state.memberLogs.logs],
        },
      };
    case MEMBER_LOG_UPDATED:
      return {
        ...state,
        isLoading: false,
        memberLogs: {
          logs: state.memberLogs.logs.map(log => {
            if (log._id == payload._id) {
              return payload;
            }
            return log;
          }),
        },
      };
    case MEMBERS_LOADED:
      return {...state, isLoading: false, societyMembers: payload};
    case MEMBER_LOADED:
      return {...state, isLoading: false, member: payload};
    default:
      return state;
  }
}
