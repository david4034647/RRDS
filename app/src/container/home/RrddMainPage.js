import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadGoodsList} from '../../action/home/loadRRDD';
import GoodsList from '../../component/home/rrdd/GoodsList';
import queryString from 'query-string';

import '../../assets/pages/home/index.scss';

class RrddMainPage extends Component {
  static displayName = 'RrddMainPage';

  static propTypes = {
    loadGoodsList: PropTypes.func,
    articleData: PropTypes.object,
    isFetching: PropTypes.bool,
    error: PropTypes.bool,
    type: PropTypes.string,
    id: PropTypes.number,
    from: PropTypes.number,
    size: PropTypes.number
  };

  componentWillMount() {
    const type = queryString.parse(location.search).type;
    const id = queryString.parse(location.search).id;
    this.props.loadGoodsList(false, true, type, id, 10);
  } 

  render() {

    const type = queryString.parse(location.search).type;
    const id = queryString.parse(location.search).id;
    const from = queryString.parse(location.search).from;
    const size = queryString.parse(location.search).size;
    const title = queryString.parse(location.search).title;
    console.log(type + id + from + size + title);
    if (title) {document.title = title;};

    // todo 添加具体的内容
    return (
      <div>
      <GoodsList
        type={type}
        id={id}
        from={from}
        size={size}
        loadList={this.props.loadGoodsList}
        isFetching={this.props.isFetching}
        error={this.props.error}
        {...this.props.articleData}
      />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    type,
    id,
    from,
    size,
    articleData,
    isFetching,
    error
  } = state.page;
  return {type, id, from, size, articleData, isFetching, error};
}

export default connect(mapStateToProps, {
  loadGoodsList
})(RrddMainPage);
