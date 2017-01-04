import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadGoodsList} from '../../action/home/loadRRDD';
import BottomTabBar from '../../component/widget/common/BottomTabBar';
import NavBar, {NAVBAR_NORMAL, NAVBAR_CLOSE, NAVBAR_SEARCH} from '../../component/widget/common/NavBar';
import GoodsList from '../../component/home/rrdd/GoodsList';
import {Tabs, WhiteSpace, List} from 'antd-mobile';
import router from '../../router';
import queryString from 'query-string';

const TabPane = Tabs.TabPane;

import '../../assets/pages/home/index.scss';

class RrddMainPage extends Component {
  static displayName = 'RrddMainPage';

  static propTypes = {
    selNow: PropTypes.number,
    loadGoodsList: PropTypes.func,
    articleData: PropTypes.object,
    isFetching: PropTypes.bool,
    error: PropTypes.bool
  };

  static defaultProps = {
    selNow: 4
  };

  componentWillMount() {
     
  }

  componentDidMount() {
    this.props.loadGoodsList();
  }

  tabsChange() {
    console.log();
  }

  handleClick() {
    location.href = router[`search`];
  }

  render() {
    const {selNow} = this.props;
    const tabBarProps = {
      selNow
    };
    const type = queryString.parse(location.search).type;

    // todo 添加具体的内容
    return (
      <div>
      <GoodsList 
        type={type}
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
    articleData,
    isFetching,
    error
  } = state.page;
  return {articleData, isFetching, error};
}

export default connect(mapStateToProps, {
  loadGoodsList
})(RrddMainPage);
