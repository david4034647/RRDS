import React, {Component, PropTypes} from 'react';
import {ActivityIndicator} from 'antd-mobile';

export default class Loading extends Component {
  static displayName = 'Loading';

  static contextTypes = {
    frog: PropTypes.object
  };

  showToast() {
    //this.setState({animating: !this.state.animating});
  }

  componentDidMount() {
    // this.context.frog.ui.loading.show();
    this.showToast;
  }

  componentWillUnmount() {
    // this.context.frog.ui.loading.hide();
  }

  render() {
    // if (this.context.frog.ua.browser.CFP) {
    //   return null;
    // }

    return (
      //<div>加载中...</div>
      <ActivityIndicator toast text="加载中..." />
    );
  }
}
