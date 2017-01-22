import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import router from '../../router';
import SearchList from '../../component/home/index/SearchList';
import {SearchBar, Drawer, Button, Tag, List} from 'antd-mobile';
import ActionFilterBar from '../../component/home/rrdd/ActionFilterBar';
import {loadGoodsList} from '../../action/home/loadRRDD';
import discount from '../../assets/pages/home/images/icon_discount_label.png';
import price from '../../assets/pages/home/images/icon_price.png';
import goodsKind from '../../assets/pages/home/images/icon_goods_kind.png';
import recordLabel from '../../assets/pages/home/images/ic_search_record.png';
import recordDelete from '../../assets/pages/home/images/ic_record_delete.png';


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
            searchShow: 'none'
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
        this.setState({
            searchShow: 'block'
        });
    }

    onCancel() {
        this.setState({
            searchShow: 'none'
        });
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

        const searchShow = this.state.searchShow;

        return (
            <div style={{backgroundColor: '#eee'}}>
                <Drawer className="my-drawer"
                        sidebar={sidebar}
                        dragHandleStyle={{display: 'none'}}
                        {...drawerProps}>
                    <div className="header">
                        <SearchBar placeholder="搜索你想要的商品" showCancelButton={true} cancelText="" disabled={false}
                                   onFocus={this.onSearchBarFocus.bind(this)}/>
                        <ActionFilterBar onFilterClick={this.onOpenChange.bind(this)}/>
                    </div>
                    <div className="content">
                        <SearchList {...this.props.articleData}
                                    loadGoods={this.props.loadGoodsList}/>
                    </div>
                </Drawer>

                <div className="search-page" style={{display: searchShow}}>
                    <div className="search-header">
                        <SearchBar
                            placeholder="请输入您想要的商品"
                            onClear={(value) => console.log(value, 'onClear')}
                            onFocus={() => console.log('onFocus')}
                            showCancelButton={true}
                        />
                    </div>

                    <div className="search-body">
                        <div className="hot-search-container">
                            <div className="hot-search-label">热门搜索</div>
                            <div className="tag-container">
                                <Tag onChange={this.onCancel.bind(this)}>牛仔裤</Tag>
                                <Tag onChange={this.onCancel.bind(this)}>鞋子</Tag>
                                <Tag onChange={this.onCancel.bind(this)}>韩版服装</Tag>
                                <Tag onChange={this.onCancel.bind(this)}>移动电源</Tag>
                                <Tag onChange={this.onCancel.bind(this)}>组装电脑</Tag>
                                <Tag onChange={this.onCancel.bind(this)}>潮流男装服饰潮流男装服饰潮流男装服饰潮流男装服饰</Tag>
                                <Tag onChange={this.onCancel.bind(this)}>iphone</Tag>
                                <Tag onChange={this.onCancel.bind(this)}>韩版服装</Tag>
                            </div>
                        </div>

                        <div className="search_record">
                            <div className="search-history-label">历史搜索</div>
                            <List>
                                {[...Array(6).keys()].map((i, index) => {
                                    return (
                                        <div className="record-item">
                                            <img className="img-record-label" src={recordLabel}/>
                                            <div className="record-text">项目{index}</div>
                                            <img className="img-record-delete" src={recordDelete}/>
                                        </div>
                                    );
                                })}
                            </List>
                            <div className="clear-all">清空搜索历史</div>
                        </div>
                    </div>
                </div>
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
