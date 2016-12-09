import React, {Component, PropTypes} from 'react';
import '../../assets/common/widget/baseloading.scss';

export default class LoadStatus extends Component {
  static displayName = 'LoadStatus';
  static propTypes = {
    isFetching: PropTypes.bool,
    showEnd: PropTypes.bool,
    hasMore: PropTypes.bool,
    error: PropTypes.bool,
    loadMore: PropTypes.func
  }

  retry = () => {
    // e.preventDefault();
    if (this.props.loadMore) {
      this.props.loadMore();
    }
  };

  render() {
    if (this.props.isFetching) {
      return (
        <div className="base-loading">
          <i className="icon-loading" />
          <span className="txt">加载中</span>
        </div>
      );
    } else if (this.props.showEnd && !this.props.hasMore) {
      return (
        <div className="base-loading">
          <span className="txt">没有更多结果了</span>
        </div>
      );
    } else if (this.props.error) {
      return (
        <div className="base-loading">
          <span className="txt" onClick={this.retry}>加载失败，点击重试</span>
        </div>
      );
    }

    return null;
  }
}
