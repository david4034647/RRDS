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
      console.log("===========xxxx=============");
      console.log(state.articleData);
      console.log(action.response);

      let Data = [];
      for(let element of action.response.hits.hits) {
        console.log(element);
        Data.push({
          Id: element._id,
          GoodsName: element._source.goods_name,
          GoodsImg: 'https://ms.wrcdn.com/' + element._source.goods_img,
          CreatTime: '2 hours ago',
          Price: element._source.bargain_min_price,
          OriginalPrice: element._source.bargain_original_price,
          ActivityType: 1,
          BuyNum: element._source.goods_stock,
          TotalNum: element._source.bargain_stock,
          CommentsNum: 34,
          GoodsDetailURL: 'https://shop' + element._source.shop_id + '.wxrrd.com/goods/' + element._id,
          BargainNum: 999,
          IsBaoyou:  1
        });

      }

      const articleData = {
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

    case HOME_RRDD_REQUEST: {
      return assign({}, state, {
        isFetching: true
      });
    }
    case HOME_RRDD_SUCCESS: {
      console.log(action.response.result.CurrentPageIndex);
      action.response.result.AllPageCount = 10;
      //action.response.result.AllDataCount = 30;
      console.log('HOME_RRDD_SUCCESS');
      action.response.result.Data = [
        {
          Id: '1',
          GoodsName: '1Title of the Article',
          GoodsImg: 'http://oc9nepvur.bkt.clouddn.com/articlePic1.jpg',
          CreatTime: '2 hours ago',
          Price: 100,
          OriginalPrice: 200,
          ActivityType: 1,
          BuyNum: 377,
          TotalNum: 800,
          CommentsNum: 34,
          GoodsDetailURL: 'http://www.sina.com'
        },
        {
          Id: '2',
          GoodsName: '2Title of the Article',
          GoodsImg: 'http://oc9nepvur.bkt.clouddn.com/articlePic2.jpg',
          CreatTime: '2 hours ago',
          Price: 76,
          OriginalPrice: 120,
          ActivityType: 1,
          BuyNum: 477,
          TotalNum: 1000,
          CommentsNum: 34,
          GoodsDetailURL: 'http://www.baidu.com'
        },
        {
          Id: '3',
          GoodsName: '33333Title of the Article',
          GoodsImg: 'http://oc9nepvur.bkt.clouddn.com/articlePic3.jpg',
          CreatTime: '3 hours ago',
          Price: 10,
          OriginalPrice: 10,
          ActivityType: 1,
          BuyNum: 377,
          TotalNum: 800,
          CommentsNum: 34,
          GoodsDetailURL: 'http://www.dodoca.com'
        }


      ]
      // console.log(state);


      const {AllDataCount, AllPageCount, CurrentPageIndex, Data } = action.response.result;
      const articleData = {
        allSize: AllDataCount,
        totalPage: AllPageCount,
        page: CurrentPageIndex,
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

    case HOME_RRDD_FAILURE: {
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
