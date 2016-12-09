import getReducer from '../getReducer';
import assign from 'object-assign';
import {HOME_RECOMMEND_REQUEST, HOME_RECOMMEND_SUCCESS, HOME_RECOMMEND_FAILURE} from '../../action/home/loadRecommend';

function recommend(state = {
  isFetching: false,
  loaded: false,
  recommendData: {},
  error: false
}, action) {
  switch (action.type) {
    case HOME_RECOMMEND_REQUEST:
      return assign({}, state, {
        isFetching: true
      });
    case HOME_RECOMMEND_SUCCESS:
      action.response.result.AllPageCount = 3;
      action.response.result.Data = [
        {
          Id: 1,
          UserId: 1,
          NickName: 'shanjie',
          HeadImg: 'http://placeholder.qiniudn.com/118x118',
          City: 'shanghai',
          Country: 'china',
          Introduce: 'it',
          Vip: 8,
          Sex: '男',
          LikeNum: 399,
          MarkList: [
            {
              Id: 1,
              MarkName: 'ASIA'
            },
            {
              Id: 2,
              MarkName: 'SPA'
            }
          ]
        },
        {
          Id: 1,
          UserId: 1,
          NickName: 'shanjie',
          HeadImg: 'http://placeholder.qiniudn.com/118x118',
          City: 'shanghai',
          Country: 'china',
          Introduce: 'it',
          Vip: 8,
          Sex: '男',
          LikeNum: 399,
          MarkList: [
            {
              Id: 1,
              MarkName: 'ASIA'
            },
            {
              Id: 2,
              MarkName: 'SPA'
            }
          ]
        },
        {
          Id: 1,
          UserId: 1,
          NickName: 'shanjie',
          HeadImg: 'http://placeholder.qiniudn.com/118x118',
          City: 'shanghai',
          Country: 'china',
          Introduce: 'it',
          Vip: 8,
          Sex: '男',
          LikeNum: 399,
          MarkList: [
            {
              Id: 1,
              MarkName: 'ASIA'
            },
            {
              Id: 2,
              MarkName: 'SPA'
            }
          ]
        },
        {
          Id: 1,
          UserId: 1,
          NickName: 'shanjie',
          HeadImg: 'http://placeholder.qiniudn.com/118x118',
          City: 'shanghai',
          Country: 'china',
          Introduce: 'it',
          Vip: 8,
          Sex: '男',
          LikeNum: 399,
          MarkList: [
            {
              Id: 1,
              MarkName: 'ASIA'
            },
            {
              Id: 2,
              MarkName: 'SPA'
            }
          ]
        },
        {
          Id: 1,
          UserId: 1,
          NickName: 'shanjie',
          HeadImg: 'http://placeholder.qiniudn.com/118x118',
          City: 'shanghai',
          Country: 'china',
          Introduce: 'it',
          Vip: 8,
          Sex: '男',
          LikeNum: 399,
          MarkList: [
            {
              Id: 1,
              MarkName: 'ASIA'
            },
            {
              Id: 2,
              MarkName: 'SPA'
            }
          ]
        },
        {
          Id: 1,
          UserId: 1,
          NickName: 'shanjie',
          HeadImg: 'http://placeholder.qiniudn.com/118x118',
          City: 'shanghai',
          Country: 'china',
          Introduce: 'it',
          Vip: 8,
          Sex: '男',
          LikeNum: 399,
          MarkList: [
            {
              Id: 1,
              MarkName: 'ASIA'
            },
            {
              Id: 2,
              MarkName: 'SPA'
            }
          ]
        },
        {
          Id: 1,
          UserId: 1,
          NickName: 'shanjie',
          HeadImg: 'http://placeholder.qiniudn.com/118x118',
          City: 'shanghai',
          Country: 'china',
          Introduce: 'it',
          Vip: 8,
          Sex: '男',
          LikeNum: 399,
          MarkList: [
            {
              Id: 1,
              MarkName: 'ASIA'
            },
            {
              Id: 2,
              MarkName: 'SPA'
            }
          ]
        },
        {
          Id: 1,
          UserId: 1,
          NickName: 'shanjie',
          HeadImg: 'http://placeholder.qiniudn.com/118x118',
          City: 'shanghai',
          Country: 'china',
          Introduce: 'it',
          Vip: 8,
          Sex: '男',
          LikeNum: 399,
          MarkList: [
            {
              Id: 1,
              MarkName: 'ASIA'
            },
            {
              Id: 2,
              MarkName: 'SPA'
            }
          ]
        },
        {
          Id: 1,
          UserId: 1,
          NickName: 'shanjie',
          HeadImg: 'http://placeholder.qiniudn.com/118x118',
          City: 'shanghai',
          Country: 'china',
          Introduce: 'it',
          Vip: 8,
          Sex: '男',
          LikeNum: 399,
          MarkList: [
            {
              Id: 1,
              MarkName: 'ASIA'
            },
            {
              Id: 2,
              MarkName: 'SPA'
            }
          ]
        }
      ]


      const {AllDataCount, AllPageCount, CurrentPageIndex, Data } = action.response.result;
      const recommendData = {
        allSize: AllDataCount,
        totalPage: AllPageCount,
        page: CurrentPageIndex,
        recommendList: [...(action.refresh ? [] : state.recommendData && state.recommendData.recommendList || []), ...(Data || [])]
      }

      return assign({}, state, {
        isFetching: false,
        loaded: true,
        error: false,
        recommendData
      });
    case HOME_RECOMMEND_FAILURE:
      return assign({}, state, {
        isFetching: false,
        error: true
      });
    default:
      return state;
  }
}

export default getReducer(recommend);
