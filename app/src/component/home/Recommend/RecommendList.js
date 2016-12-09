import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import AuthorItem from '../../widget/common/AuthorItem';
import InfiniteList from '../../../component/widget/InfiniteList';




export default class RecommendList extends Component {
  static displayName = 'HomeIndexRecommendList';

  static propTypes = {
    loadRecommend: PropTypes.func,
    recommendList: PropTypes.array,
    page: PropTypes.number,
    totalPage: PropTypes.number,
    isFetching: PropTypes.bool,
    error: PropTypes.bool
  }

  constructor(props) {
    super(props);
  }


  //加载更多
  loadMore = () => {
    this.props.loadRecommend(false, false);
  }

  renderItem = (item, key) => {
    return <AuthorItem {...item} key={key} />;
  };

  renderItems = (items, props) => {
    return (
      <ul {...props}>{items}</ul>
    );
  };


  render() {
    const hasMore = this.props.page === 0 || this.props.page < this.props.totalPage;

    if (isEmpty(this.props.recommendList) || this.props.recommendList.length === 0 && !hasMore) {
      return null;
    }

    const listProps = {
      className: 'recommend-list',
      items: this.props.recommendList,
      isFetching: this.props.isFetching,
      itemRenderer: this.renderItem,
      itemsRenderer: this.renderItems,
      hasMore,
      error: this.props.error,
      loadMore: this.loadMore
    };

    return (
      <InfiniteList {...listProps} />
    );
  }


  // render() {
  //   return (
  //     <ul>
  //       <AuthorItem/>
  //     </ul>
  //   )
  // }
}
