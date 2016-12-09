import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

import List from './List';
import LoadStatus from './LoadStatus';

function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return (domElt.offsetTop || 0) + topPosition(domElt.offsetParent);
}

class InfiniteList extends Component {
  static displayName = 'InfiniteList';

  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.array.isRequired,
    itemRenderer: PropTypes.func,
    itemsRenderer: PropTypes.func,
    isFetching: PropTypes.bool,
    hasMore: PropTypes.bool,
    showEnd: PropTypes.bool,
    error: PropTypes.bool,
    loadMore: PropTypes.func.isRequired
  };

  static defaultProps = {
    showEnd: true
  };

  componentDidMount() {
    this.attachScrollListener();
  }

  componentDidUpdate() {
    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  scrollListener = () => {
    const el = findDOMNode(this);
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < 250) {
      this.detachScrollListener();
      this.props.loadMore();
    }
  };

  attachScrollListener() {
    if (this.props.hasMore && !this.props.isFetching && !this.props.error) {
      window.addEventListener('scroll', this.scrollListener);
      window.addEventListener('resize', this.scrollListener);
      this.scrollListener();
    }
  }

  detachScrollListener() {
    window.removeEventListener('scroll', this.scrollListener);
    window.removeEventListener('resize', this.scrollListener);
  }

  render() {
    const {
      className, items, itemRenderer, itemsRenderer,
      isFetching, hasMore, showEnd, error, loadMore
    } = this.props;

    const listProps = {
      className,
      items,
      itemRenderer,
      itemsRenderer
    };

    const statusProps = {
      isFetching,
      hasMore,
      showEnd,
      error,
      loadMore
    };

    return (
      <div>
        <List {...listProps} />
        <LoadStatus {...statusProps} />
      </div>
    );
  }
}

export default InfiniteList;
