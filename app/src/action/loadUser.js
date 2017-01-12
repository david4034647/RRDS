import {CALL_API} from '../middleware/api';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

function loadUser() {
  return {
    [CALL_API]: {
      types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
      endpoint: 'profile',
      json: true
    }
  };
}

export default (force = false) => {
  return (dispatch, getState) => {
    const {isFetching, isLogin} = getState().user;

    if (isFetching || isLogin && !force) {
      return null;
    }

    return null;
    //return dispatch(loadUser());
  };
};
