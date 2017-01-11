import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import loadSearch from '../../action/home/loadSearch';
import loadGoods from '../../action/home/loadGoods';
import SearchList from '../../component/home/index/SearchList';
import {SearchBar, Drawer, List} from 'antd-mobile';
import ActionFilterBar from '../../component/home/rrdd/ActionFilterBar';


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

    constructor() {
        super();

        this.state = {
            open: false,
        };
    }


    onOpenChange(isOpen) {
        console.log("onOpenChange");
        console.log(isOpen, arguments);
        this.setState({open: !this.state.open});
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
        const sidebar = (<div style={{'background-color': 'white', 'width': '300px'}}>
            筛选条件
        </div>);

        const drawerProps = {
            open: this.state.open,
            position: 'right',
            onOpenChange: this.onOpenChange.bind(this),
        };

        return (
            <div style={{backgroundColor: '#eee'}}>
                <Drawer className="my-drawer"
                        sidebar={sidebar}
                        dragHandleStyle={{display: 'none'}}
                        {...drawerProps}/>
                <SearchBar placeholder="搜索你想要的商品" showCancelButton={true} cancelText="" disabled={false}
                           onFocus={this.onSearchBarFocus}/>
                <ActionFilterBar onFilterClick={this.onOpenChange.bind(this)}/>
                <SearchList  {...this.props.goodsListData} loadGoods={this.props.loadGoods}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {error, isFetching, goodsListData} = state.page;
    const goodsList = goodsListData.goodsList;
    return {goodsList, error, isFetching, goodsListData};
}

export default connect(mapStateToProps, {
    loadGoods
})(SearchPage);
