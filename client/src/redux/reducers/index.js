import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import developer from './developer';
import society from './society';

export default combineReducers({
  auth,
  alert,
  developer,
  society,
});
