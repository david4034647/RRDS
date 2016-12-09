import {CALL_API} from '../../middleware/api';

export const LOGIN_SUBMIT_REQUEST = 'LOGIN_SUBMIT_REQUEST';
export const LOGIN_SUBMIT_SUCCESS = 'LOGIN_SUBMIT_SUCCESS';
export const LOGIN_SUBMIT_FAILURE = 'LOGIN_SUBMIT_FAILURE';

function loginSubmit(account, password) {
  return {
    [CALL_API]: {
      types: [LOGIN_SUBMIT_REQUEST, LOGIN_SUBMIT_SUCCESS, LOGIN_SUBMIT_FAILURE],
      endpoint: 'user_signin', // todo add endpoint
      json: true,
      params: {
        account,
        password
      },
      showLoading: true
    }
  };
}

export default (account, password) => {
  return (dispatch, getState) => {
    const {isFetching, loaded} = getState().page;
    if (isFetching) {
      return null;
    }

    return dispatch(loginSubmit(account, password));
  };
};
