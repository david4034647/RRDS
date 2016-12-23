import {CALL_API} from '../../middleware/api';

export const SEARCH_GOODS_REQUEST = 'SEARCH_GOODS_REQUEST';
export const SEARCH_GOODS_SUCCESS = 'SEARCH_GOODS_SUCCESS';
export const SEARCH_GOODS_FAILURE = 'SEARCH_GOODS_FAILURE';

function loadList(page, refresh, showLoading) {
    console.log("loadGoods ====> load List");
    return {
        refresh,
        page,
        [CALL_API]: {
            types: [SEARCH_GOODS_REQUEST, SEARCH_GOODS_SUCCESS, SEARCH_GOODS_FAILURE],
            endpoint: 'QueryWordInfoPageList',
            json: true,
            params: {
                PageIndex: page
            },
            showLoading
        }
    };
}

export default(refresh = false, showLoading = true) => {
    console.log("loadGoods ====> load goods list");
    return (dispatch, getState) => {
        const {isFetching} = getState().page;
        console.log("test: " + isFetching);
        const {totalPage = 0} = getState().page && getState().page.goodsListData;
        console.log("=============totalPage : " +　totalPage);
        let {page = 0} = getState().page && getState().page.goodsListData;
        console.log("=============page : " +　page);

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
}
;
