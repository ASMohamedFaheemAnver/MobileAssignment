import {SOCIETY_API_CALL_TRIGGERED, SOCIETY_LOG_LOADED} from '../actions/types';

const initialState = {
  isLoading: false,
  societyLogs: {
    logs: [],
    logs_count: 0,
  },
};
export default function (state = initialState, action) {
  const {type, payload} = action;
  // console.log({type});
  switch (type) {
    case SOCIETY_LOG_LOADED:
      return {...state, isLoading: false, societyLogs: payload};
    case SOCIETY_API_CALL_TRIGGERED:
      return {...state, isLoading: true};
    default:
      return state;
  }
}
