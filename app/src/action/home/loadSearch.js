import {CALL_API} from '../../middleware/api';

export const HOME_SEARCH_REQUEST = 'HOME_SEARCH_REQUEST';
export const HOME_SEARCH_SUCCESS = 'HOME_SEARCH_SUCCESS';
export const HOME_SEARCH_FAILURE = 'HOME_SEARCH_FAILURE';

function loadSearch(showLoading) {
  return {
    [CALL_API]: {
      types: [HOME_SEARCH_REQUEST, HOME_SEARCH_SUCCESS, HOME_SEARCH_FAILURE],
      endpoint: '', // todo add endpoint
      json: true,
      showLoading
    }
  };
}

export default (force = false, showLoading = true) => {
  return (dispatch, getState) => {
    const {isFetching, loaded} = getState().page;
    if (isFetching || loaded && !force) {
      return null;
    }

    return dispatch(loadSearch(showLoading));
  };
};
