import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import InfiniteList from '../../../component/widget/InfiniteList';
import GoodsItem from '../../widget/common/GoodsItem';

export default class SearchList extends Component {
    static displayName = 'HomeIndexSearchList';

    static propTypes = {
        loadGoods: PropTypes.func,
        goodsList: PropTypes.array,
        page: PropTypes.number,
        totalPage: PropTypes.number,
        isFetching: PropTypes.bool,
        HeadImg: PropTypes.string,
        error: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    //加载更多
    loadMore = () => {
        console.log("====>加载更多");
        this.props.loadGoods(false, false);
    };

    renderItem = (item, key) => {
        return <GoodsItem {...item} key={key}/>;
    };

    renderItems = (items, props) => {
        return (
            <ul {...props}>{items}</ul>
        );
    };


    render() {
        const goodsList = this.props.goodsList;
        //console.log("goodsList: " + goodsList);
        //console.log("//////page: " + this.props.page + " totalPage: " + this.props.totalPage);
        const hasMore = this.props.page === 0 || this.props.page < this.props.totalPage;

        if (isEmpty(this.props.goodsList) || this.props.goodsList.length === 0 && !hasMore) {
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
