import getReducer from '../getReducer';
import assign from 'object-assign';
import {
  HOME_RRDD_BANNER_REQUEST,
  HOME_RRDD_BANNER_SUCCESS,
  HOME_RRDD_BANNER_FAILURE,
  HOME_RRDD_NAV_REQUEST,
  HOME_RRDD_NAV_SUCCESS,
  HOME_RRDD_NAV_FAILURE,
  HOME_RRDD_REQUEST,
  HOME_RRDD_SUCCESS,
  HOME_RRDD_FAILURE
} from '../../action/home/loadRRDD';

function rrdd(state = {
  isBannerFetching: false,
  loadedBanner: false,
  bannerList: [],
  isNavFetching: false,
  loadedNav: false,
  navList: [],
  isFetching: false,
  loaded: false,
  articleData: {},
  error: false
}, action) {
  console.log(action);
  switch (action.type) {

    case HOME_RRDD_REQUEST: {
      return assign({}, state, {
        isFetching: true
      });
    }
    case HOME_RRDD_SUCCESS: {
      console.log(action.response.result.CurrentPageIndex);
      action.response.result.AllPageCount = 20;
      console.log('HOME_RRDD_SUCCESS');
      action.response.result.Data = [
        {
          Id: '1',
          Title: 'Title of the Article',
          HeadImg: 'http://oc9nepvur.bkt.clouddn.com/articlePic1.jpg',
          Introduce: '',
          WordContent: '',
          CreatTime: '2 hours ago',
          LikeNum: 377,
          CommentNum: 122,
          UserId: 1,
          UserName: 'Olen B. Shephard',
          UserHeadImage: 'http://placeholder.qiniudn.com/118x118'
        },
        {
          Id: '1',
          Title: 'Title of the Article',
          HeadImg: 'http://oc9nepvur.bkt.clouddn.com/articlePic2.jpg',
          Introduce: '',
          WordContent: '',
          CreatTime: '2 hours ago',
          LikeNum: 377,
          CommentNum: 122,
          UserId: 1,
          UserName: 'Olen B. Shephard',
          UserHeadImage: 'http://placeholder.qiniudn.com/118x118'
        },
        {
          Id: '1',
          Title: 'Title of the Article',
          HeadImg: 'http://oc9nepvur.bkt.clouddn.com/articlePic3.jpg',
          Introduce: '',
          WordContent: '',
          CreatTime: '2 hours ago',
          LikeNum: 377,
          CommentNum: 122,
          UserId: 1,
          UserName: 'Olen B. Shephard',
          UserHeadImage: 'http://placeholder.qiniudn.com/118x118'
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
