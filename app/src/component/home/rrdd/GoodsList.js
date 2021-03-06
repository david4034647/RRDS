import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import GoodsBargainItem from './GoodsBargainItem';
import GoodsGroupBuyItem from './GoodsGroupBuyItem';
import GoodsSeckillItem from './GoodsSeckillItem';
import InfiniteList from '../../../component/widget/InfiniteList';

export default class GoodsList extends Component {
  static displayName = 'RrddMainGoodsList';

  static propTypes = {
    loadList: PropTypes.func,
    goodsList: PropTypes.array,
    page: PropTypes.number,
    totalPage: PropTypes.number,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
    type: PropTypes.string,
    id: PropTypes.string,
    from: PropTypes.string,
    size: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  //加载更多
  loadMore = () => {
    this.props.loadList(false, false, this.props.type, this.props.id, this.props.size);
  }

  renderItem = (item, key) => {
    if (this.props.type === '1') {
      return <GoodsBargainItem {...item} key={key} />;
    } else if (this.props.type === '2') {
      return <GoodsGroupBuyItem {...item} key={key} />;
    } else if(this.props.type === '3'){
        return <GoodsSeckillItem {...item} key={key}/>
    } else {
      return <GoodsGroupBuyItem {...item} key={key} />;
    }
  };

  renderItems = (items, props) => {
    return (
      <ul {...props}>{items}</ul>
    );
  };


  render() {

    const hasMore = true;

    if (isEmpty(this.props.goodsList) || this.props.goodsList.length === 0) {
      return null;
    }

    const listProps = {
      className: 'goods-list',
      items: this.props.goodsList,
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
