import getReducer from '../getReducer';
import assign from 'object-assign';
import {HOME_SEARCH_REQUEST, HOME_SEARCH_SUCCESS, HOME_SEARCH_FAILURE} from '../../action/home/loadSearch';

function search(state = {
  isFetching: false,
  loaded: false
}, action) {
  switch (action.type) {
    case HOME_SEARCH_REQUEST:
      return assign({}, state, {
        isFetching: true
      });
    case HOME_SEARCH_SUCCESS:
      return assign({}, state, {
        isFetching: false,
        loaded: true
      });
    case HOME_SEARCH_FAILURE:
      return assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}

export default getReducer(search);
