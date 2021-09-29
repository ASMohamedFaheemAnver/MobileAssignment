import {SET_ALERT} from './types';

export const setAlert = errors => dispatch => {
  dispatch({type: SET_ALERT, payload: {errors}});
};

export const removeAlert = _ => dispatch => {
  dispatch({type: SET_ALERT});
};
