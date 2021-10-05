import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import developer from './developer';
import society from './society';
import member from './member';

export default combineReducers({
  auth,
  alert,
  developer,
  society,
  member,
});
