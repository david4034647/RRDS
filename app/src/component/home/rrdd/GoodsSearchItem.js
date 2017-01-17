import React, {Component, PropTypes} from 'react';
import isEmpty from 'lodash/isEmpty';

import '../../../assets/common/widget/goodsItem.scss';
import SearchGoods from '../rrdd/SearchGoods';


export default class GoodsItem extends Component {
    static displayName = 'widgetArticleItem';

    static propTypes = {};

    render() {
        let goods = [];
        for (let i in this.props) {
            goods.push(this.props[i]);
        }

        return (
            <li className="goods-item-li">
                {goods.map(function (result, index) {
                    return <SearchGoods key={index}  {...result}/>;
                })}
            </li>
        )
    }
}
