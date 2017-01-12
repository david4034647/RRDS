import getReducer from '../getReducer';
import assign from 'object-assign';
import {
  HOME_RRDD_BARGAIN_REQUEST,
  HOME_RRDD_BARGAIN_SUCCESS,
  HOME_RRDD_BARGAIN_FAILURE,

  HOME_RRDD_PINTUAN_REQUEST,
  HOME_RRDD_PINTUAN_SUCCESS,
  HOME_RRDD_PINTUAN_FAILURE,

  HOME_RRDD_SECKILL_REQUEST,
  HOME_RRDD_SECKILL_SUCCESS,
  HOME_RRDD_SECKILL_FAILURE,

  HOME_RRDD_REQUEST,
  HOME_RRDD_SUCCESS,
  HOME_RRDD_FAILURE
} from '../../action/home/loadRRDD';

function rrdd(state = {
  isFetching: false,
  loaded: false,
  articleData: {},
  error: false
}, action) {
  //console.log(action);
  switch (action.type) {
    case HOME_RRDD_BARGAIN_REQUEST: {
      return assign({}, state, {
        isFetching: true
      });
    }

    case HOME_RRDD_BARGAIN_SUCCESS: {
      // console.log("===========xxxx=============");
      // console.log(state.articleData);
      // console.log(action.response);

      let Data = [];
      
      for(let i=0; i < action.response.hits.hits.length; i++) {
        let element = action.response.hits.hits[i]; 
        const isBaoyou = (element._source.goods_postage===0?0:1);
        const {PintuanPrice = 0, PintuanMember = 0} = parsePintuanItem(element._source.pintuan_item);

        Data.push({
          Id: element._id,
          GoodsName: 'david' + element._source.goods_name,
          GoodsImg: 'https://ms.wrcdn.com/' + element._source.goods_img,
          CreatTime: '2 hours ago',
          GoodsDetailURL: element._source.goods_url,
          ActivityType: 1,
          IsBaoyou:  isBaoyou,

          Bargain_Price: element._source.bargain_min_price,
          Bargain_OriginalPrice: element._source.bargain_original_price,
          Bargain_BuyNum: element._source.bargain_csale,
          Bargain_StockNum: element._source.goods_stock,          
          Bargain_CountNum: element._source.bargain_join_members,
          
          Pintuan_Price:  PintuanPrice,
          Pintuan_OriginalPrice:  element._source.goods_price,
          Pintuan_Stock:  element._source.pintuan_stock,
          Pintuan_Csale:  element._source.goods_csale,
          Pintuan_Member: PintuanMember,

          Seckill_GoodsPrice: element._source.goods_price,
          Seckill_Stock: element._source.goods_stock,
          Seckill_Price: element._source.seckill_price,
          Seckill_Csale: element._source.goods_base_csale,
          Seckill_BaseSale: element._source.goods_csale

        });

     }

      let {from = 0} = state.articleData;
      from = Number(from) + Data.length;

      const articleData = {
        from: from+'',
        goodsList: [...(action.refresh ? [] : state.articleData && state.articleData.goodsList || []), ...(Data || [])]
      }

      // newsList: [...(action.refresh ? [] : state.newsList), ...(action.response.result.newsList || [])],
      return assign({}, state, {
        isFetching: false,
        loaded: true,
        error: false,
        articleData
      });

    }

    case HOME_RRDD_BARGAIN_FAILURE: {
      return assign({}, state, {
        isFetching: false,
        error: true
      });
    }
    
    default: {
      return state;
    }
  }
}

export default getReducer(rrdd);


/////////////// Customize Method ////////////////
function parsePintuanItem(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return{PintuanPrice: 0, PintuanMember: 0};
  };

  let price = items[0].pintuan_item_price;
  let member = items[0].pintuan_item_member;
  for(let item of items) {
    if (item.pintuan_item_price < price) {
      price = item.pintuan_item_price;
      member = item.pintuan_item_member;
    } 
  }

  return {PintuanPrice: price, PintuanMember: member};
}
