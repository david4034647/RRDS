import {CALL_API} from '../../middleware/api';

export const HOME_RECOMMEND_REQUEST = 'HOME_RECOMMEND_REQUEST';
export const HOME_RECOMMEND_SUCCESS = 'HOME_RECOMMEND_SUCCESS';
export const HOME_RECOMMEND_FAILURE = 'HOME_RECOMMEND_FAILURE';

function loadRecommend(page, refresh, showLoading) {
  return {
    refresh,
    page,
    [CALL_API]: {
      types: [HOME_RECOMMEND_REQUEST, HOME_RECOMMEND_SUCCESS, HOME_RECOMMEND_FAILURE],
      endpoint: 'QueryUserPageListByRecommendation', // todo add endpoint
      json: true,
      params: {
        PageIndex: page
      },
      showLoading
    }
  };
}

export default (refresh = false, showLoading = true) => {
  return (dispatch, getState) => {
    const {isFetching} = getState().page;
    const {totalPage = 0} = getState().page && getState().page.recommendData;
    let {page = 0} = getState().page && getState().page.recommendData;

    //判断是否刷新
    if (refresh) {
      page = 0;
    }

    //正在获取时 or 当前页数等于总页数时 不再调用。
    if (isFetching || !refresh && page > 0 && page >= totalPage) {
      return null;
    }


    return dispatch(loadRecommend(page + 1, refresh, showLoading));
  };
};
