import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import loadSearch from '../../action/home/loadSearch';
import loadGoods from '../../action/home/loadGoods';
import SearchList from '../../component/home/index/SearchList';
import {SearchBar, Drawer, Button} from 'antd-mobile';
import ActionFilterBar from '../../component/home/rrdd/ActionFilterBar';
import {loadGoodsList} from '../../action/home/loadRRDD';
import discount from '../../assets/pages/home/images/icon_discount_label.png';
import price from '../../assets/pages/home/images/icon_price.png';
import goodsKind from '../../assets/pages/home/images/icon_goods_kind.png';


import '../../assets/pages/home/search.scss';

class SearchPage extends Component {
    static displayName = 'HomeSearchPage';

    static propTypes = {
        loadGoodsList: PropTypes.func,
        isFetching: PropTypes.bool,
        articleData: PropTypes.array,
        error: PropTypes.bool,
        goodsListData: PropTypes.object,
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
        // this.props.loadGoods(true, true);
        this.props.loadGoodsList(false, true, '3', '3', 10);
    }

    onSearchBarFocus() {
        window.location.href = "http://www.baidu.com";
    }

    render() {
        const sidebar = (<div className="filter-window">
            <div className="label-filter">
                <img src={discount} className="img-filter"/>
                <span className="filter-name">折扣和服务</span>
            </div>

            <ul className="container-filter_func">
                <li className="filter-item">
                    <Button className='btn-filter'>闪电发货</Button>
                    <Button className='btn-filter'>7天退货</Button>
                    <Button className='btn-filter'>包邮</Button>
                </li>
                <li className="filter-item">
                    <Button className='btn-filter'>秒杀</Button>
                    <Button className='btn-filter'>拼团</Button>
                    <Button className='btn-filter'>砍价</Button>
                </li>
            </ul>

            <div className="label-filter">
                <img src={price} className="img-filter"/>
                <span className="filter-name">价格区间</span>
            </div>

            <div className="price-filter">
                <Button className='btn-price'> </Button>
                <div className="sign_label"> &minus; </div>
                <Button className='btn-price'> </Button>
            </div>

            <div className="label-filter">
                <img src={goodsKind} className="img-filter"/>
                <span className="filter-name">商品分类</span>
            </div>

            <ul className="container-filter_func">
                <li className="filter-item">
                    <Button className='btn-filter'>家具家装</Button>
                    <Button className='btn-filter'>出行装备</Button>
                    <Button className='btn-filter'>清洁机</Button>
                </li>
                <li className="filter-item">
                    <Button className='btn-filter'>酸奶机</Button>
                </li>
            </ul>
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
                        {...drawerProps}>
                    <div className="header">
                        <SearchBar placeholder="搜索你想要的商品" showCancelButton={true} cancelText="" disabled={false}
                                   onFocus={this.onSearchBarFocus}/>
                        <ActionFilterBar onFilterClick={this.onOpenChange.bind(this)}/>
                    </div>
                    <div className="content">
                        <SearchList {...this.props.articleData}
                                    loadGoods={this.props.loadGoodsList}/>
                    </div>
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
        type,
        id,
        articleData,
        isFetching,
        error
    } = state.page;

    console.log("mapStateToProps ------------------------");
    console.log(state.page);

    return {type, id, articleData, isFetching, error};
}

export default connect(mapStateToProps, {
    loadGoodsList,
})(SearchPage);
