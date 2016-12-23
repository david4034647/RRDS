import React, {Component, PropTypes} from 'react';
import {Progress, SegmentedControl} from 'antd-mobile';

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
	    GoodsDetailURL: PropTypes.string
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

	handleClick() {
	    console.log("click " + this.props.GoodsDetailURL);
	    window.location.href = this.props.GoodsDetailURL;
	  }

	render() {
		const price = this.formatCurrency(this.props.Price);
		const integerOfPrice = this.integerOfNum(price);
		const gradeOfPrice = this.gradeOfNum(price);
		const originalPrice = this.formatCurrency(this.props.OriginalPrice);

		return (
			<li className="goods-item" onClick={() => {
            this.handleClick();

          	}} >
		        <div className="goods-pic" style={{backgroundImage: `url('${this.props.GoodsImg}')`}} />

		        <div className="goods-context">
		        	<div className="goods-name">{this.props.GoodsName}</div>

		        	<div className="goods-price">
		        		<div className="bargain-price">团购价 ¥<span className="integer-price">{integerOfPrice}</span>{gradeOfPrice}</div>
		        		<div className="original-price"> 原价{originalPrice}</div>
		        	</div>

		        	<div className="goods-percent">
		        		<div className="percent-progress"> 
			        		<Progress percent="80.0" position="normal" unfilled="show" />
			        		<div className="progress-value">95%</div>
		        		</div>
		        		
		        		<div className="percent-surplus">(剩余1000个)</div>

		        	</div>

		        	<div className="goods-opt">
		        		<SegmentedControl selectedIndex={1} tintColor={'#f24657'} values={['8人团', '去拼团 >']} style={{height: '28px', width: '90%'}} />
		        		<div className="opt-mask" />
		        	</div>
		        </div>
		     </li>
			)
	}

}