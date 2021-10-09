import {
  API_CALL_TRIGGERED,
  BASIC_SOCIETY_INFO_LOADED,
  LOGIN_FAIL,
  PASSWORD_RESET_COMPLETED,
  PASSWORD_RESET_REQUESTED,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESET_PASSWORD_RESET_REQUESTED_STATE,
  RESET_REGISTER_STATE,
  SOCIETY_SELECTED,
  USER_LOGGED_OUT,
  USER_META_LOADED,
  USER_META_NOT_FOUND,
} from '../actions/types';

const initalState = {
  isAuthenticated: false,
  isLoading: true,
  userCategory: null,
  basicSocieties: [],
  selectedSociety: null,
  isRegistered: false,
  isPasswordResetRequested: false,
  isPasswordResetCompleted: false,
};

export default function (state = initalState, action) {
  const {type, payload} = action;
  // console.log({type});
  switch (type) {
    case USER_META_LOADED:
      return {...state, isAuthenticated: true, isLoading: false, ...payload};
    case USER_META_NOT_FOUND:
      return {...state, isAuthenticated: false, isLoading: false};
    case USER_LOGGED_OUT:
      return {...initalState, isLoading: false};
    case API_CALL_TRIGGERED:
      return {...state, isLoading: true};
    case LOGIN_FAIL:
    case REGISTER_SUCCESS:
      return {...state, isLoading: false, isRegistered: true};
    case RESET_REGISTER_STATE:
      return {...state, isLoading: false, isRegistered: false};
    case PASSWORD_RESET_REQUESTED:
      return {...state, isLoading: false, isPasswordResetRequested: true};
    case PASSWORD_RESET_COMPLETED:
      return {...state, isLoading: false, isPasswordResetCompleted: true};
    case RESET_PASSWORD_RESET_REQUESTED_STATE:
      return {...state, isLoading: false, isPasswordResetRequested: false};
    case REGISTER_FAIL:
      return {...state, isLoading: false};
    case BASIC_SOCIETY_INFO_LOADED:
      return {...state, isLoading: false, basicSocieties: [...payload]};
    case SOCIETY_SELECTED:
      return {...state, isLoading: false, selectedSociety: {...payload}};
    default:
      return state;
  }
}
