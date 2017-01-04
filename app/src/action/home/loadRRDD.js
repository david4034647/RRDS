import {CALL_API} from '../../middleware/api';

export const HOME_RRDD_REQUEST = 'HOME_RRDD_REQUEST';
export const HOME_RRDD_SUCCESS = 'HOME_RRDD_SUCCESS';
export const HOME_RRDD_FAILURE = 'HOME_RRDD_FAILURE';

export const HOME_RRDD_GOODS_REQUEST = 'HOME_RRDD_GOODS_REQUEST';
export const HOME_RRDD_GOODS_SUCCESS = 'HOME_RRDD_GOODS_SUCCESS';
export const HOME_RRDD_GOODS_FAILURE = 'HOME_RRDD_GOODS_FAILURE';

function loadGoodsList(page, refresh, showLoading) {
  return {
    refresh,
    page,
    [CALL_API]: {
      types: [HOME_RRDD_GOODS_REQUEST, HOME_RRDD_GOODS_SUCCESS, HOME_RRDD_GOODS_FAILURE],
      endpoint: 'goodstype',
      json: true,
      params: {
        PageIndex: page
      },
      showLoading
    }
  };
};

exports.loadGoodsList = (refresh = false, showLoading = true) => {
  return (dispatch, getState) => {
    // const {isFetching} = getState().page;
    // const {type} = getState().page;
    // const {totalPage = 0} = getState().page && getState().page.articleData;
    // let {page = 0} = getState().page && getState().page.articleData;
    // let {params = {}} = getState().page;

    const {isFetching} = getState().page;
    const {totalPage = 0} = getState().page && getState().page.articleData;
    let {page = 0} = getState().page && getState().page.articleData;

    //判断是否刷新
    if (refresh) {
      page = 0;
    }

    //正在获取时 or 当前页数等于总页数时 不再调用。
    if (isFetching || !refresh && page > 0 && page >= totalPage) {
      return null;
    }

    return dispatch(loadGoodsList(page + 1, refresh, showLoading));
  };
};



function loadList(page, refresh, showLoading) {
  return {
    refresh,
    page,
    [CALL_API]: {
      types: [HOME_RRDD_REQUEST, HOME_RRDD_SUCCESS, HOME_RRDD_FAILURE],
      endpoint: 'QueryWordInfoPageList',
      json: true,
      params: {
        PageIndex: page
      },
      showLoading
    }
  };
};

exports.loadList = (refresh = false, showLoading = true) => {
  return (dispatch, getState) => {
    const {isFetching} = getState().page;
    const {totalPage = 0} = getState().page && getState().page.articleData;
    let {page = 0} = getState().page && getState().page.articleData;

    //判断是否刷新
    if (refresh) {
      page = 0;
    }

    //正在获取时 or 当前页数等于总页数时 不再调用。
    if (isFetching || !refresh && page > 0 && page >= totalPage) {
      return null;
    }

    return dispatch(loadList(page + 1, refresh, showLoading));
  };
};
