import {
  ALL_SOCIETY_LOADED,
  DEVELOPER_API_CALL_FAILED,
  DEVELOPER_API_CALL_TRIGGERED,
  SOCIETY_UPDATED,
  USER_LOGGED_OUT,
} from '../actions/types';
const initialState = {isLoading: false, societies: []};
export default function (state = initialState, action) {
  const {type, payload} = action;
  // console.log({type});
  switch (type) {
    case ALL_SOCIETY_LOADED:
      return {isLoading: false, societies: payload};
    case SOCIETY_UPDATED:
      return {
        isLoading: false,
        societies: state.societies.map(society => {
          if (society._id == payload._id) return payload;
          return society;
        }),
      };
    case USER_LOGGED_OUT:
      return {
        ...initialState,
      };
    case DEVELOPER_API_CALL_TRIGGERED:
      return {...state, isLoading: true};
    case DEVELOPER_API_CALL_FAILED:
      return {...state, isLoading: false};
    default:
      return state;
  }
}
