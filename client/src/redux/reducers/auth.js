import {
  API_CALL_TRIGGERED,
  BASIC_SOCIETY_INFO_LOADED,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SOCIETY_SELECTED,
  USER_META_LOADED,
  USER_META_NOT_FOUND,
} from '../actions/types';

const initalState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  userCategory: null,
  basicSociety: [],
  selectedSociety: null,
};

export default function (state = initalState, action) {
  const {type, payload} = action;
  switch (type) {
    case USER_META_LOADED:
      return {...state, isAuthenticated: true, isLoading: false, ...payload};
    case USER_META_NOT_FOUND:
      return {...state, isAuthenticated: false, isLoading: false};
    case API_CALL_TRIGGERED:
      return {...state, isLoading: true};
    case LOGIN_FAIL:
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
      return {...state, isLoading: false};
    case BASIC_SOCIETY_INFO_LOADED:
      return {...state, isLoading: false, basicSociety: [...payload]};
    case SOCIETY_SELECTED:
      return {...state, isLoading: false, selectedSociety: {...payload}};
    default:
      return state;
  }
}
