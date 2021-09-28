import {
  API_CALL_TRIGGERED,
  LOGIN_FAIL,
  USER_META_LOADED,
  USER_META_NOT_FOUND,
} from "../actions/types";

const initalState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  userCategory: null,
};

export default function (state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_META_LOADED:
      return { ...state, isAuthenticated: true, isLoading: false, ...payload };
    case USER_META_NOT_FOUND:
      return { ...state, isAuthenticated: false, isLoading: false };
    case API_CALL_TRIGGERED:
      return { ...state, isLoading: true };
    case LOGIN_FAIL:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
