import {CALL_API} from '../../middleware/api';

export const HOME_RRDD_REQUEST = 'HOME_RRDD_REQUEST';
export const HOME_RRDD_SUCCESS = 'HOME_RRDD_SUCCESS';
export const HOME_RRDD_FAILURE = 'HOME_RRDD_FAILURE';

export const HOME_RRDD_BARGAIN_REQUEST = 'HOME_RRDD_BARGAIN_REQUEST';
export const HOME_RRDD_BARGAIN_SUCCESS = 'HOME_RRDD_BARGAIN_SUCCESS';
export const HOME_RRDD_BARGAIN_FAILURE = 'HOME_RRDD_BARGAIN_FAILURE';

function loadGoodsList(type, id, from, size, refresh, showLoading) {
  const loadType = type;
  return {
    loadType,
    refresh,
    from,
    [CALL_API]: {
      types: [HOME_RRDD_BARGAIN_REQUEST, HOME_RRDD_BARGAIN_SUCCESS, HOME_RRDD_BARGAIN_FAILURE],
      endpoint: 'goodstype',
      json: false,
      params: {
        id: id,
        from: from,
        size: 10
      },
      showLoading
    }
  };
};

exports.loadGoodsList = (refresh = false, showLoading = true, type = 1, id = 1, size = 10 ) => {
  return (dispatch, getState) => {

    const {isFetching} = getState().page;
    let {from = 0} = getState().page && getState().page.articleData;

    //判断是否刷新
    if (refresh) {
      from = 0;
    }

    //console.log("======= from:" + from);
    return dispatch(loadGoodsList(type, id, from, size, refresh, showLoading));
  };
};
