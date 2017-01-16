import React, {Component, PropTypes} from 'react';
import {SegmentedControl} from 'antd-mobile';
import {Line} from 'rc-progress';

import '../../../assets/common/widget/goodsGroupBuyItem.scss';

export default class GoodsGroupBuyItem extends Component {
	static displayName = 'widgetGoodsGroupBuyItem';

	static propTypes = {
	    CreatTime: PropTypes.string,
	    GoodsImg: PropTypes.string,
	    Id: PropTypes.string,
	    GoodsName: PropTypes.string,
	    ActivityType: PropTypes.number,
	    GoodsDetailURL: PropTypes.string,

		Pintuan_Price: PropTypes.number,
	    Pintuan_OriginalPrice: PropTypes.number,
	    Pintuan_Stock:  PropTypes.number,
        Pintuan_Csale:  PropTypes.number,
        Pintuan_Member: PropTypes.number
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
	    //console.log("click " + this.props.GoodsDetailURL);
	    window.location.href = this.props.GoodsDetailURL;
	  }

	render() {
		const price = this.formatCurrency(this.props.Pintuan_Price);
		const integerOfPrice = this.integerOfNum(price);
		const gradeOfPrice = this.gradeOfNum(price);
		const originalPrice = this.formatCurrency(this.props.Pintuan_OriginalPrice);
		const member = this.props.Pintuan_Member + "人团";
		const stock = Number(this.props.Pintuan_Stock)-Number(this.props.Pintuan_Csale);
		const percent = (stock*100/this.props.Pintuan_Stock).toFixed(0);
		const stampStyle = this.showStamp(this.props.IsBaoyou);

		return (
			<li className="goods-item" >
		        <div className="goods-pic" style={{backgroundImage: `url('${this.props.GoodsImg}')`}}  onClick={() => {
		            this.handleClick();

		          	}}>
		        	<div className="goods-stamp" style={{display: stampStyle}}  />
		        </div>

		        <div className="goods-context">
		        	<div className="goods-name">{this.props.GoodsName}</div>

		        	<div className="goods-price">
		        		<div className="bargain-price">团购价 ¥<span className="integer-price">{integerOfPrice}</span>{gradeOfPrice}</div>
		        		<div className="original-price">原价{originalPrice}</div>
		        	</div>

		        	<div className="goods-percent">
		        		<div className="percent-surplus">(剩余{(stock) || 0}个)</div>
		        		<div className="percent-progress"> 
			        		<Line className="progress" percent={percent || 0} strokeWidth="14" strokeColor="#f24657" trailWidth="14" trailColor="#dfdfdf" />
			        		<div className="progress-value">{(stock||0) + "/" + (this.props.Pintuan_Stock||0)}</div>
			        		
		        		</div>
		        	</div>

		        	<div className="goods-opt">
		        		<SegmentedControl selectedIndex={1} tintColor={'#f24657'} values={[member, '去拼团 >']} style={{height: '28px'}} />
		        		<div className="opt-mask" onClick={() => {
			            this.handleClick();

			          	}}/>
		        	</div>
		        </div>
		     </li>
			)
	}

}