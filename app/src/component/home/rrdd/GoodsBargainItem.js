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
	    Price: PropTypes.number,
	    OriginalPrice: PropTypes.number,
	    GoodsName: PropTypes.string,
	    ActivityType: PropTypes.number,
	    BuyNum: PropTypes.number,
	    TotalNum: PropTypes.number,
	    CommentsNum: PropTypes.number,
	    GoodsDetailURL: PropTypes.string,
	    BargainNum: PropTypes.number,
	    IsBaoyou: PropTypes.number
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
		const price = this.formatCurrency(this.props.Price);
		const integerOfPrice = this.integerOfNum(price);
		const gradeOfPrice = this.gradeOfNum(price);
		const originalPrice = this.formatCurrency(this.props.OriginalPrice);
		const percent = ((this.props.BuyNum*100/this.props.TotalNum) || 0).toFixed(0);
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
		        		<div className="bargain-price">团购价 ¥<span className="integer-price">{integerOfPrice}</span>{gradeOfPrice}</div>
		        		<div className="original-price"> 原价{originalPrice}</div>
		        	</div>

		        	<div className="kanjia-percent">
		        		<div className="percent-surplus">(剩余{(this.props.TotalNum-this.props.BuyNum) || 0}个)</div>
		        		<div className="percent-progress"> 
			        		<Line className="progress" percent={percent} strokeWidth="14" strokeColor="#f24657" trailWidth="14" trailColor="#dfdfdf" />
			        		<div className="progress-value">{percent}%</div>
			        		
		        		</div>
		        	</div>

		        	<div className="kanjia-opt">
		        		<div className="opt-icon" />
		        		<div className="opt-desc"><span className="opt-num">{this.props.BargainNum || 0}</span>人在砍价</div>
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