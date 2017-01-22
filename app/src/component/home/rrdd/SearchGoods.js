import React, {Component, PropTypes} from 'react';
import '../../../assets/common/widget/searchGoods.scss';


export default class Goods extends Component {
    static displayName = 'Goods';
    static propTypes = {
        GoodsImg: PropTypes.string,
        GoodsName: PropTypes.string,
        GoodsDetailURL: PropTypes.string,
        Seckill_GoodsPrice: PropTypes.string,
        SendType: PropTypes.string,
        Seckill_Stock: PropTypes.number,
        Seckill_Csale: PropTypes.number,
        IsBaoyou: PropTypes.bool,
    };

    toGoodsDetails() {
        window.location.href = this.props.GoodsDetailURL;
    }

    render() {
        const isBaoyou = this.props.IsBaoyou;
        return (
            <div className="search-goods">
                <div className="search-goods-pic" style={{backgroundImage: `url('${this.props.GoodsImg}')`}}
                     onClick={() => {
                         this.toGoodsDetails();
                     }}/>
                <div className="goods_info">
                    <div className="search-goods-name">
                        {this.props.GoodsName}
                    </div>
                    <div className="search-goods-price">
                        <span className="search-money-sign">￥</span>
                        <span>{this.props.Seckill_GoodsPrice}</span>
                        <span className={isBaoyou ? "search-send-type" : "search-send-hidden"}>包邮</span>
                    </div>
                    <div className="search-pay-count">
                        <span className="search_user_count">{this.props.Seckill_Stock}付款</span>
                        <span className="comment_count">{this.props.Seckill_Csale}条评论</span>
                    </div>
                </div>
            </div>
        )
    }
}
