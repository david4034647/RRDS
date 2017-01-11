import React, {Component, PropTypes} from 'react';
import '../../../assets/common/widget/searchGoods.scss';


export default class Goods extends Component {
    static displayName = 'Goods';
    static propTypes = {
        HeadImg: PropTypes.string,
        ShopName: PropTypes.string,
        GoodsName: PropTypes.string,
        GoodsPrices: PropTypes.string,
        SendType: PropTypes.string,
        PayCount: PropTypes.number,
        CommontCount: PropTypes.number,
    };


    render() {
        return (
            <div className="goods">
                <a href="http://www.baidu.com">
                    <div className="goods-pic" style={{backgroundImage: `url('${this.props.HeadImg}')`}}/>
                    <div className="goods_info">
                        <div className="goods-name">
                            【{this.props.ShopName}】
                            {this.props.GoodsName}
                        </div>
                        <div className="goods-price">
                            <span className="money-sign">￥</span>
                            <span> {this.props.GoodsPrices}</span>
                            <span className="send-type">{this.props.SendType}</span>
                        </div>
                        <div className="pay-count">
                            <span className="user_count">{this.props.PayCount}付款</span>
                            <span className="comment_count">{this.props.CommontCount}条评论</span>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}
