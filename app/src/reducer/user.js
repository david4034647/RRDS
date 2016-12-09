import assign from 'lodash/assign';
import {USER_REQUEST, USER_SUCCESS, USER_FAILURE} from '../action/loadUser';

export default (state = {
  isFetching: false,
  isLogin: false
}, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return assign({}, state, {
        isFetching: true
      });
    case USER_SUCCESS:
      return assign({}, state, action.response.result.user, {
        isFetching: false,
        isLogin: true
      });
    case USER_FAILURE:
      return {
        isFetching: false,
        isLogin: false
      };
    default:
      if (action.code === 100002) {
        return {
          isFetching: false,
          isLogin: false
        };
      }
      return state;
  }
};
