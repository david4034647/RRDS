import React, {Component, PropTypes} from 'react';

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

	render() {
		return (
			<li className="goods-item">
		        <div className="goods-pic" style={{backgroundImage: `url('${this.props.GoodsImg}')`}} />
		        <div className="goods-context">
		        	<div className="goods-name">{this.props.GoodsName}滚滚滚滚滚滚滚风的地方地方滚滚滚滚滚风的地方地方滚滚滚滚滚风的地方地方滚滚滚滚滚风的地方地方</div>
		        	<div className="goods-price">
		        		<div className="bargain-price">团购价 ¥{this.props.Price}</div>
		        		<div className="original-price"> 原价{this.props.OriginalPrice}</div>
		        	</div>

		        </div>

		     </li>
			)
	}

}