import React, {Component, PropTypes} from 'react';
import isEmpty from 'lodash/isEmpty';

import '../../../assets/common/widget/goodsItem.scss';
import Goods from '../Goods';


export default class GoodsItem extends Component {
    static displayName = 'widgetArticleItem';

    static propTypes = {
        Id: PropTypes.string,
        HeadImg: PropTypes.string,
        ShopName: PropTypes.string,
        GoodsName: PropTypes.string,
        GoodsPrices: PropTypes.string,
        SendType: PropTypes.string,
        PayCount: PropTypes.number,
        CommontCount: PropTypes.number,
    };

    render() {
        const goodsInfo1 = {
            HeadImg: this.props.HeadImg,
            ShopName: this.props.ShopName,
            GoodsName: this.props.GoodsName,
            GoodsPrices: this.props.GoodsPrices,
            SendType: this.props.SendType,
            PayCount: this.props.PayCount,
            CommontCount: this.props.CommontCount
        };

        const goodsInfo2 = {
            HeadImg: "url('./images/goods1.png')",
            ShopName: "测试店铺",
            GoodsName: "测试商品",
            GoodsPrices: '998.00',
            SendType: '自提',
            PayCount: 20,
            CommontCount: 10
        };

        return (
            <li className="goods-item">
                <Goods Position='left' {...goodsInfo1}/>
                <Goods Position='right' {...goodsInfo2}/>
            </li>
        )
    }
}
