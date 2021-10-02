import {SET_ALERT} from '../actions/types';
const initialState = [];
export default function (state = initialState, action) {
  const {type, payload} = action;
  // console.log({type});
  switch (type) {
    case SET_ALERT:
      return payload ? [...payload] : [];
    default:
      return state;
  }
}
