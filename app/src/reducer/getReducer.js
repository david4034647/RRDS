import {combineReducers} from 'redux';
import timeDelta from './timeDelta';
import showLoading from './showLoading';
import user from './user';
export default (page) => {
  return combineReducers({
    timeDelta,
    showLoading,
    user,
    page
  });
};
