import React, {Component, PropTypes} from 'react';
import isEmpty from 'lodash/isEmpty';

import '../../../assets/common/widget/goodsItem.scss';
import Goods from '../rrdd/Goods';


export default class GoodsItem extends Component {
    static displayName = 'widgetArticleItem';

    static propTypes = {};

    render() {
        const goods = this.props;
        console.log("goods: " + goods);
        return (
            <li className="goods-item-li">
                <Goods {...goods[0]}/>
                <Goods {...goods[1]}/>
            </li>
        )
    }
}
