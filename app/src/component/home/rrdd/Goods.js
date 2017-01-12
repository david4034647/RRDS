import React, {Component, PropTypes} from 'react';
import {Button} from 'antd-mobile';
import {Line} from 'rc-progress';
import '../../../assets/common/widget/goods.scss';


export default class Goods extends Component {

    static displayName = 'Goods';
    static propTypes = {
        GoodsImg: PropTypes.string,
        GoodsDetailURL: PropTypes.string,
        GoodsName: PropTypes.string,
        IsBaoyou: PropTypes.number,
        Seckill_GoodsPrice: PropTypes.number,
        Seckill_Stock: PropTypes.number,
        Seckill_Price: PropTypes.number,
        Seckill_Csale: PropTypes.number,
        Seckill_BaseSale: PropTypes.number
    };

    handleClick(e) {
        console.log("跳转商品详情");
        window.location.href = this.props.GoodsDetailURL;
    }

    showStamp(isBaoyou) {
        if (isBaoyou === 1) {
            return "block";
        } else {
            return "none";
        }
    }

    render() {
        const originalPrice = this.props.Seckill_GoodsPrice;
        const price = this.props.Seckill_Price;
        const stampStyle = this.showStamp(this.props.IsBaoyou);
        const totalNum = Number(this.props.Seckill_Csale) + Number(this.props.Seckill_Stock)
            + Number(this.props.Seckill_BaseSale);
        const percent = Number(this.props.Seckill_Stock * 100 / totalNum).toFixed(0);

        return (
            <div className="sec-goods">
                <div className="sec-goods-pic" style={{backgroundImage: `url('${this.props.GoodsImg}')`}}
                     onClick={(e) => {
                         this.handleClick();
                     }}>
                    <div className="sec-goods-stamp" style={{display: stampStyle}}/>
                </div>
                <div className="sec-goods_info">
                    <div className="sec-goods-name">
                        {this.props.GoodsName}
                    </div>
                    <div className="sec-goods-price">
                        <span className="money-sign">￥</span>
                        <span> {price}</span>
                        <div className="sec-original-price">原价{originalPrice}</div>
                    </div>

                    <div className="sec-goods-percent">
                        <div className="percent-surplus">(剩余
                            <span className="percent-surplus-value">{this.props.Seckill_Stock}</span>个)
                        </div>
                        <div className="sec-percent-progress">
                            <Line className="progress" percent={percent || 0} strokeWidth="14" strokeColor="#f24657"
                                  trailWidth="14" trailColor="#dfdfdf"/>
                            <div className="sec-progress-value">{percent}%</div>
                        </div>
                    </div>

                    <Button className="sec-opt-btn" size="small" inline type="primary" onClick={e => {
                        this.handleClick();
                    }}>{'立即抢 >'}</Button>
                </div>
            </div>
        )
    }
}
