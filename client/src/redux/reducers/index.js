import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import developer from './developer';

export default combineReducers({
  auth,
  alert,
  developer,
});
