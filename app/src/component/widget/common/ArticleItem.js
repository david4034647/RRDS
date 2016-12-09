import React, {Component, PropTypes} from 'react';
import isEmpty from 'lodash/isEmpty';

import '../../../assets/common/widget/articleItem.scss';


export default class ArticleItem extends Component {
  static displayName = 'widgetArticleItem';

  static propTypes = {
    CreatTime: PropTypes.string,
    HeadImg: PropTypes.string,
    Id: PropTypes.string,
    LikeNum: PropTypes.number,
    Title: PropTypes.string,
    UserHeadImage: PropTypes.string,
    UserId: PropTypes.number,
    UserName: PropTypes.string
  }


  render() {
    return (
      <li className="article-item">
        <div className="article-avatar" style={{backgroundImage: `url('${this.props.UserHeadImage}')`}} />
        <div className="article-pic" style={{backgroundImage: `url('${this.props.HeadImg}')`}} />
        <div className="article-context">
          <div className="article-author">By {this.props.UserName}  -  {this.props.CreatTime}</div>
          <div className="article-title">
            {this.props.Title}
          </div>
          <div className="article-like article-like-off">
            {this.props.LikeNum || 0}
          </div>
        </div>
      </li>
    )
  }
}
