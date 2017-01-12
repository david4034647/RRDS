import React, {Component, PropTypes} from 'react';
import isEmpty from 'lodash/isEmpty';

import '../../../assets/common/widget/goodsItem.scss';
import Goods from '../rrdd/Goods';


export default class GoodsItem extends Component {
    static displayName = 'widgetArticleItem';

    static propTypes = {
    };

    render() {
        let goods =[];
        for(let i in this.props) {
            goods.push(this.props[i]);
        }

        return (
            <li className="goods-item-li">
                {goods.map(function (result) {
                    return <Goods {...result}/>;
                })}
            </li>
        )
    }
}
