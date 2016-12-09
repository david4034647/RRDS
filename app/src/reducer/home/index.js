import getReducer from '../getReducer';
import assign from 'object-assign';
import {
  HOME_INDEX_BANNER_REQUEST,
  HOME_INDEX_BANNER_SUCCESS,
  HOME_INDEX_BANNER_FAILURE,
  HOME_INDEX_NAV_REQUEST,
  HOME_INDEX_NAV_SUCCESS,
  HOME_INDEX_NAV_FAILURE,
  HOME_INDEX_REQUEST,
  HOME_INDEX_SUCCESS,
  HOME_INDEX_FAILURE
} from '../../action/home/loadIndex';

function index(state = {
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
  switch (action.type) {
    case HOME_INDEX_BANNER_REQUEST: {
      return assign({}, state, {
        isBannerFetching: true
      });
    }
    case HOME_INDEX_BANNER_SUCCESS: {
      const bannerList = action.response.result;
      return assign({}, state, {
        isBannerFetching: false,
        loadedBanner: true,
        bannerList
      });
    }
    case HOME_INDEX_BANNER_FAILURE: {
      return assign({}, state, {
        isBannerFetching: false
      });
    }
    case HOME_INDEX_NAV_REQUEST: {
      return assign({}, state, {
        isNavFetching: true
      });
    }
    case HOME_INDEX_NAV_SUCCESS: {
      //
      // action.response.result = [
      //   {
      //     CategoryImage: 'http://oc9nepvur.bkt.clouddn.com/nav1.jpg',
      //     CategoryId: '1',
      //     CategoryType: 'test',
      //     CategoryName: '情侣'
      //   },
      //
      //   {
      //     CategoryImage: 'http://oc9nepvur.bkt.clouddn.com/nav2.jpg',
      //     CategoryId: '2',
      //     CategoryType: 'test',
      //     CategoryName: '酒店'
      //   },
      //
      //   {
      //     CategoryImage: 'http://oc9nepvur.bkt.clouddn.com/nav3.jpg',
      //     CategoryId: '3',
      //     CategoryType: 'test',
      //     CategoryName: '摄影'
      //   },
      //
      //   {
      //     CategoryImage: 'http://oc9nepvur.bkt.clouddn.com/nav1.jpg',
      //     CategoryId: '4',
      //     CategoryType: 'test',
      //     CategoryName: '美食'
      //   },
      //
      //   {
      //     CategoryImage: 'http://oc9nepvur.bkt.clouddn.com/nav1.jpg',
      //     CategoryId: '4',
      //     CategoryType: 'test',
      //     CategoryName: '美食'
      //   }
      //
      // ];



      const navList = action.response.result;

      return assign({}, state, {
        isNavFetching: false,
        loadedNav: true,
        navList
      });
    }
    case HOME_INDEX_NAV_FAILURE: {
      return assign({}, state, {
        isNavFetching: false
      });
    }
    case HOME_INDEX_REQUEST: {
      return assign({}, state, {
        isFetching: true
      });
    }
    case HOME_INDEX_SUCCESS: {
      action.response.result.AllPageCount = 3;
      // console.log('HOME_INDEX_SUCCESS');
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
        articleList: [...(action.refresh ? [] : state.articleData && state.articleData.articleList || []), ...(Data || [])]
      }

      // newsList: [...(action.refresh ? [] : state.newsList), ...(action.response.result.newsList || [])],
      return assign({}, state, {
        isFetching: false,
        loaded: true,
        error: false,
        articleData
      });
    }
    case HOME_INDEX_FAILURE: {
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

export default getReducer(index);
