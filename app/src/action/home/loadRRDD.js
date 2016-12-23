import {CALL_API} from '../../middleware/api';

export const HOME_RRDD_BANNER_REQUEST = 'HOME_RRDD_BANNER_REQUEST';
export const HOME_RRDD_BANNER_SUCCESS = 'HOME_RRDD_BANNER_SUCCESS';
export const HOME_RRDD_BANNER_FAILURE = 'HOME_RRDD_BANNER_FAILURE';
export const HOME_RRDD_NAV_REQUEST = 'HOME_RRDD_NAV_REQUEST';
export const HOME_RRDD_NAV_SUCCESS = 'HOME_RRDD_NAV_SUCCESS';
export const HOME_RRDD_NAV_FAILURE = 'HOME_RRDD_NAV_FAILURE';
export const HOME_RRDD_REQUEST = 'HOME_RRDD_REQUEST';
export const HOME_RRDD_SUCCESS = 'HOME_RRDD_SUCCESS';
export const HOME_RRDD_FAILURE = 'HOME_RRDD_FAILURE';

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
    console.log("====totalPage:" + totalPage);
    console.log("====page:" + page);


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
