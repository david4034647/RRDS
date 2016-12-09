import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import ArticleItem from '../../widget/common/ArticleItem';
import InfiniteList from '../../../component/widget/InfiniteList';




export default class ArticleList extends Component {
  static displayName = 'HomeIndexArticleList';

  static propTypes = {
    loadList: PropTypes.func,
    articleList: PropTypes.array,
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
    this.props.loadList(false, false);
  }

  renderItem = (item, key) => {
    return <ArticleItem {...item} key={key} />;
  };

  renderItems = (items, props) => {
    return (
      <ul {...props}>{items}</ul>
    );
  };


  render() {

    const hasMore = this.props.page === 0 || this.props.page < this.props.totalPage;

    if (isEmpty(this.props.articleList) || this.props.articleList.length === 0 && !hasMore) {
      return null;
    }

    const listProps = {
      className: 'article-list',
      items: this.props.articleList,
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
}
