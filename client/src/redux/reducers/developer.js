import {
  ALL_SOCIETY_LOADED,
  DEVELOPER_API_CALL_FAILED,
  DEVELOPER_API_CALL_TRIGGERED,
} from '../actions/types';
const initialState = {isLoading: false, societies: []};
export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case ALL_SOCIETY_LOADED:
      return {isLoading: false, societies: payload};
    case DEVELOPER_API_CALL_TRIGGERED:
      return {...state, isLoading: true};
    case DEVELOPER_API_CALL_FAILED:
      return {...state, isLoading: false};
    default:
      return state;
  }
}
