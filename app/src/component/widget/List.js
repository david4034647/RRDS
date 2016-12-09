import React, {Component, PropTypes} from 'react';

class List extends Component {
  static displayName = 'List';

  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.array.isRequired,
    itemRenderer: PropTypes.func,
    itemsRenderer: PropTypes.func
  };

  static defaultProps = {
    itemRenderer: (item, key) => <div key={key}>{item}</div>,
    itemsRenderer: (items, props) => <div {...props}>{items}</div>
  };

  renderItems() {
    const items = this.props.items.map(this.props.itemRenderer);
    const {className} = this.props;

    return this.props.itemsRenderer(items, {
      className
    });
  }

  render() {
    const {items} = this.props;

    if (!items || items.length === 0) {
      return null;
    }

    return this.renderItems();
  }
}

export default List;
