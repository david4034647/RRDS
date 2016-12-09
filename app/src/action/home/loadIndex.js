import {CALL_API} from '../../middleware/api';

export const HOME_INDEX_BANNER_REQUEST = 'HOME_INDEX_BANNER_REQUEST';
export const HOME_INDEX_BANNER_SUCCESS = 'HOME_INDEX_BANNER_SUCCESS';
export const HOME_INDEX_BANNER_FAILURE = 'HOME_INDEX_BANNER_FAILURE';
export const HOME_INDEX_NAV_REQUEST = 'HOME_INDEX_NAV_REQUEST';
export const HOME_INDEX_NAV_SUCCESS = 'HOME_INDEX_NAV_SUCCESS';
export const HOME_INDEX_NAV_FAILURE = 'HOME_INDEX_NAV_FAILURE';
export const HOME_INDEX_REQUEST = 'HOME_INDEX_REQUEST';
export const HOME_INDEX_SUCCESS = 'HOME_INDEX_SUCCESS';
export const HOME_INDEX_FAILURE = 'HOME_INDEX_FAILURE';

function loadBanner(showLoading) {
  return {
    [CALL_API]: {
      types: [HOME_INDEX_BANNER_REQUEST, HOME_INDEX_BANNER_SUCCESS, HOME_INDEX_BANNER_FAILURE],
      endpoint: 'QueryADInfoList',
      json: true,
      params: {
        TopNum: 5
      },
      showLoading
    }
  };
};

function loadNav(showLoading) {
  return {
    [CALL_API]: {
      types: [HOME_INDEX_NAV_REQUEST, HOME_INDEX_NAV_SUCCESS, HOME_INDEX_NAV_FAILURE],
      endpoint: 'QueryCategoryList',
      json: true,
      showLoading
    }
  };
};


function loadList(page, refresh, showLoading) {
  return {
    refresh,
    page,
    [CALL_API]: {
      types: [HOME_INDEX_REQUEST, HOME_INDEX_SUCCESS, HOME_INDEX_FAILURE],
      endpoint: 'QueryWordInfoPageList',
      json: true,
      params: {
        PageIndex: page
      },
      showLoading
    }
  };
};

exports.loadBanner = (force = false, showLoading = true) => {
  return (dispatch, getState) => {
    const {isBannerFetching, loadedBanner} = getState().page;
    if (isBannerFetching || loadedBanner && !force) {
      return null;
    }

    return dispatch(loadBanner(showLoading));
  };
};


exports.loadNav = (force = false, showLoading = true) => {
  return (dispatch, getState) => {
    const {isNavFetching, loadedNav} = getState().page;
    if (isNavFetching || loadedNav && !force) {
      return null;
    }

    return dispatch(loadNav(showLoading));
  };
};

exports.loadList = (refresh = false, showLoading = true) => {
  return (dispatch, getState) => {
    const {isFetching} = getState().page;
    console.log(getState());
    const {totalPage = 0} = getState().page && getState().page.articleData;
    //console.log('david test2');
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
