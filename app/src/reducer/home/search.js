import getReducer from '../getReducer';
import assign from 'object-assign';
import {SEARCH_GOODS_REQUEST, SEARCH_GOODS_SUCCESS, SEARCH_GOODS_FAILURE} from '../../action/home/loadGoods';

function search(state = {
    isFetching: false,
    loaded: false,
    goodsListData: {},
    error: false
}, action) {
    switch (action.type) {
        case SEARCH_GOODS_REQUEST:
            console.log('SEARCH_GOODS_REQUEST');
            return assign({}, state, {
                isFetching: true
            });
        case SEARCH_GOODS_SUCCESS:
            action.response.result.AllPageCount = 5;
            //action.response.result.AllDataCount = 20;
            console.log('SEARCH_GOODS_SUCCESS');
            action.response.result.Data = [
                {
                    Id: '1',
                    ShopName: '清风1111',
                    HeadImg: 'http://oc9nepvur.bkt.clouddn.com/articlePic1.jpg',
                    GoodsName: '纸巾',
                    GoodsPrices: '99.00',
                    PayCount: 377,
                    CommontCount: 122,
                    SendType: '包邮'
                },
                {
                    Id: '2',
                    ShopName: '天喔',
                    HeadImg: 'http://img1.imgtn.bdimg.com/it/u=1791201152,2261574731&fm=23&gp=0.jpg',
                    GoodsName: '坚果',
                    GoodsPrices: '56.00',
                    PayCount: 1008,
                    CommontCount: 850,
                    SendType: '包邮'
                },
                {
                    Id: '3',
                    ShopName: "三只松鼠",
                    HeadImg: 'http://img3.imgtn.bdimg.com/it/u=3224528553,801983646&fm=21&gp=0.jpg',
                    GoodsName: '夏威夷果',
                    GoodsPrices: '30.00',
                    PayCount: 596,
                    CommontCount: 563,
                    SendType: '包邮'
                }
            ];
            console.log("isrefresh: " + action.refresh);
            console.log("list: " + state.goodsListData.goodsList);
            console.log("CurrentPageIndex : " +　action.response.result.CurrentPageIndex);
            const {AllDataCount, AllPageCount, CurrentPageIndex, Data} = action.response.result;
            const goodsListData = {
                allSize: AllDataCount,
                totalPage: AllPageCount,
                page: CurrentPageIndex,
                goodsList: [...(action.refresh ? [] : state.goodsListData && state.goodsListData.goodsList || []), ...(Data || [])]
            };
            return assign({}, state, {
                isFetching: false,
                loaded: true,
                goodsListData
            });
        case SEARCH_GOODS_FAILURE:
            console.log('SEARCH_GOODS_FAILURE');
            return assign({}, state, {
                isFetching: false
            });
        default:
            console.log('default');
            return state;
    }
}

export default getReducer(search);
