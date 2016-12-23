import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import loadSearch from '../../action/home/loadSearch';
import loadGoods from '../../action/home/loadGoods';
import SearchList from '../../component/home/index/SearchList';
import {SearchBar} from 'antd-mobile';
import ActionFilterBar from '../../component/widget/ActionFilterBar';


import '../../assets/pages/home/search.scss';

class SearchPage extends Component {
    static displayName = 'HomeSearchPage';

    static propTypes = {
        loadGoods: PropTypes.func,
        isFetching: PropTypes.bool,
        goodsList: PropTypes.array,
        error: PropTypes.bool,
        goodsListData: PropTypes.object
    };

    componentWillMount() {
    }

    componentDidMount() {
        this.props.loadGoods(true, false);
    }

    onSearchBarFocus() {
        console.log("点击跳转");
    }

    render() {
        return (
            <div style={{backgroundColor: '#eee'}}>
                <SearchBar placeholder="搜索你想要的商品" showCancelButton={true} cancelText="" disabled={false}
                           onFocus={this.onSearchBarFocus}/>
                <ActionFilterBar/>
                <SearchList  {...this.props.goodsListData} loadGoods={this.props.loadGoods}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {error, isFetching, goodsListData} = state.page;
    console.log("goodsListData: ");
    const goodsList = goodsListData.goodsList;
    return {goodsList, error, isFetching, goodsListData};
}

export default connect(mapStateToProps, {
    loadGoods
})(SearchPage);
