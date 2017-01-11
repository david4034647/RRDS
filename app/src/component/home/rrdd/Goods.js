import React, {Component, PropTypes} from 'react';
import {Button} from 'antd-mobile';
import {Line} from 'rc-progress';
import '../../../assets/common/widget/goods.scss';


export default class Goods extends Component {

    static displayName = 'Goods';
    static propTypes = {
        Seckill_GoodsImg: PropTypes.string,
        Seckill_GoodsDetailURL: PropTypes.string,
        Seckill_GoodsName: PropTypes.string,
        Seckill_OriginalPrice: PropTypes.number,
        Seckill_BargainNum: PropTypes.number,
        Seckill_Price: PropTypes.number,
        Seckill_TotalNum: PropTypes.number
    };

    handleClick(e) {
        console.log("跳转商品详情");
        window.location.href = this.props.Seckill_GoodsDetailURL;
    }

    render() {
        const originalPrice = this.props.Seckill_OriginalPrice;
        const price = this.props.Seckill_Price;
        return (
            <div className="goods">
                <div className="goods-pic" style={{backgroundImage: `url('${this.props.Seckill_GoodsImg}')`}}
                     onClick={(e) => {
                         this.handleClick();
                     }}>
                    <div className="goods-stamp"/>
                </div>
                <div className="goods_info">
                    <div className="goods-name">
                        {this.props.Seckill_GoodsName}
                    </div>
                    <div className="goods-price">
                        <span className="money-sign">￥</span>
                        <span> {price}</span>
                        <div className="original-price">原价{originalPrice}</div>
                    </div>

                    <div className="goods-percent">
                        <div className="percent-surplus">(剩余
                            <span className="percent-surplus-value">{this.props.Seckill_BargainNum}</span>个)
                        </div>
                        <div className="percent-progress">
                            <Line className="progress" percent="65.0" strokeWidth="14" strokeColor="#f24657"
                                  trailWidth="14" trailColor="#dfdfdf"/>
                            <div className="progress-value">65%</div>
                        </div>
                    </div>

                    <Button className="opt-btn" size="small" inline type="primary" onClick={e => {
                        this.handleClick();
                    }}>{'立即抢 >'}</Button>
                </div>
            </div>
        )
    }
}
