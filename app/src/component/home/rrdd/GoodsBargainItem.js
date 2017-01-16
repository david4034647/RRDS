import React, {Component, PropTypes} from 'react';
import {Button} from 'antd-mobile';
import {Line} from 'rc-progress';

import '../../../assets/common/widget/goodsBargainItem.scss';

export default class GoodsBargainItem extends Component {
	static displayName = 'widgetGoodsBargainItem';

	static propTypes = {
	    CreatTime: PropTypes.string,
	    GoodsImg: PropTypes.string,
	    Id: PropTypes.string,
	    GoodsDetailURL: PropTypes.string,
	    IsBaoyou: PropTypes.number,
	    GoodsName: PropTypes.string,
	    ActivityType: PropTypes.number,

	    Bargain_Price: PropTypes.number,
	    Bargain_OriginalPrice: PropTypes.number,
	    Bargain_BuyNum: PropTypes.number,
	    Bargain_StockNum: PropTypes.number,
	    Bargain_CountNum: PropTypes.number
	  }

	formatCurrency(num) {
		if (isNaN(num)) {
			num = "0";
		};

		var number = new Number(num);
		num = number.toFixed(2);

	    return num;
	} 

	integerOfNum(num) {
		var index = num.indexOf('.');
		if (index != -1) {
			return num.substring(0, index);
		} else {
			return num;
		}
	}

	gradeOfNum(num) {
		var index = num.indexOf('.');
		if (index != -1) {
			return num.substring(index);
		} else {
			return "00";
		}
	}

	showStamp(isBaoyou) {
		if (isBaoyou === 1) {
			return "block";
		} else {
			return "none";
		}
	}

	handleClick() {
	    console.log("click " + this.props.GoodsDetailURL);
	    window.location.href = this.props.GoodsDetailURL;
	  }

	render() {
		const price = this.formatCurrency(this.props.Bargain_Price);
		const integerOfPrice = this.integerOfNum(price);
		const gradeOfPrice = this.gradeOfNum(price);
		const originalPrice = this.formatCurrency(this.props.Bargain_OriginalPrice);
		const stock = Number(this.props.Bargain_StockNum)-Number(this.props.Bargain_BuyNum);
		const percent = (stock*100/this.props.Bargain_StockNum).toFixed(0);
		const stampStyle = this.showStamp(this.props.IsBaoyou);

		return (
			<li className="kanjia-item">
		        <div className="kanjia-pic" style={{backgroundImage: `url('${this.props.GoodsImg}')`}} onClick={() => {
            	this.handleClick();
          	}}>
		        	<div className="kanjia-stamp" style={{display: stampStyle}}  />
		        </div>

		        <div className="kanjia-context">
		        	<div className="kanjia-name">{this.props.GoodsName}</div>

		        	<div className="kanjia-price">
		        		<div className="bargain-price">底价 ¥<span className="integer-price">{integerOfPrice}</span>{gradeOfPrice}</div>
		        		<div className="original-price"> 原价{originalPrice}</div>
		        	</div>

		        	<div className="kanjia-percent">
		        		<div className="percent-surplus">(剩余{(stock) || 0}个)</div>
		        		<div className="percent-progress"> 
			        		<Line className="progress" percent={percent || 0} strokeWidth="14" strokeColor="#f24657" trailWidth="14" trailColor="#dfdfdf" />
			        		<div className="progress-value">{(stock||0) + "/" + (this.props.Bargain_StockNum||0)}</div>
			        		
		        		</div>
		        	</div>

		        	<div className="kanjia-opt">
		        		<div className="opt-icon" />
		        		<div className="opt-desc"><span className="opt-num">{this.props.Bargain_CountNum || 0}</span>人在砍价</div>
		        		<Button className="opt-btn" size="small" inline type="primary" onClick={e=> {
		        			//console.log(e);
		        			this.handleClick();
		        		}} >{'去砍价 >'}</Button>
		        	</div>

		        </div>
		     </li>
			)
	}

}