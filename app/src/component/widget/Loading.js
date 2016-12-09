import React, {Component, PropTypes} from 'react';

export default class Loading extends Component {
  static displayName = 'Loading';

  static contextTypes = {
    frog: PropTypes.object
  };

  componentDidMount() {
    // this.context.frog.ui.loading.show();
  }

  componentWillUnmount() {
    // this.context.frog.ui.loading.hide();
  }

  render() {
    // if (this.context.frog.ua.browser.CFP) {
    //   return null;
    // }

    return (
      <div>Loading...</div>
    );
  }
}
