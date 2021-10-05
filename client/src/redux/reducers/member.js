import {MEMBER_LOADED, MEMBER_LOG_LOADED} from '../actions/types';

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
  switch (type) {
    case MEMBER_LOG_LOADED:
      return {...state, isLoading: false, memberLogs: payload};
    case MEMBER_LOADED:
      return {...state, isLoading: false, member: payload};
    default:
      return state;
  }
}
