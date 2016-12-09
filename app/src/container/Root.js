import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import loadUser from '../action/loadUser';
import Loading from '../component/widget/Loading';
// import frog from '@cfp/frog';
import {getTimes} from '../lib/util/timing';
import {version} from '../../../package.json';
import qs from 'query-string';
import assign from 'object-assign';

const clientWidth = window.document.documentElement.clientWidth;

class Root extends Component {
  static displayName = 'Root';

  static propTypes = {
    loadUser: PropTypes.func,
    showLoading: PropTypes.bool,
    timeDelta: PropTypes.number,
    children: PropTypes.any
  };

  static defaultProps = {
    timeDelta: 0
  };

  static childContextTypes = {
    now: PropTypes.func
  };

  getChildContext() {
    return {
      // frog,
      now: () => {
        return Date.now() + this.props.timeDelta;
      }
    };
  }

  componentWillMount() {
    this.props.loadUser();
  }

  componentDidMount() {

  }

  handleTouchStart = (event) => {
    const posX = event.touches ? event.touches[0].pageX : event.clientX;
    const posY = event.touches ? event.touches[0].pageY : event.clientY;
    this.dragging = true;
    this.touchObject = {
      startX: posX,
      startY: posY,
      curX: posX,
      curY: posY,
      onBoundary: posX < (clientWidth / 8)
    };
    this.isScrolling = undefined;
  };

  handleTouchMove = (event) => {
    if (!this.dragging) {
      this.handleTouchStart(event);
      return;
    }

    const touchObject = this.touchObject;

    touchObject.curX = event.touches ? event.touches[0].pageX : event.clientX;
    touchObject.curY = event.touches ? event.touches[0].pageY : event.clientY;

    // This is a one time test
    if (this.isScrolling === undefined) {
      this.isScrolling = Math.abs(touchObject.curY - touchObject.startY) > Math.abs(touchObject.curX - touchObject.startX) || event.defaultPrevented;
    }

    if (this.isScrolling) {
      return;
    }

    if (!this.touchObject.onBoundary) {
      event.preventDefault();
    }
  };

  handelTouchEnd = () => {
    if (!this.dragging) {
      return;
    }
    this.dragging = false;
  };

  render() {
    const touchEvent = true ? {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handelTouchEnd,
      onTouchCancel: this.handelTouchEnd
    } : {};

    return (
      <div {...touchEvent}>
        {this.props.showLoading && <Loading />}
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {showLoading, timeDelta} = state;

  return {
    showLoading,
    timeDelta
  };
}

export default connect(mapStateToProps, {
  loadUser
})(Root);
