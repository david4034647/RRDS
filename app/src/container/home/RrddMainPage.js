import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadBanner, loadNav, loadList} from '../../action/home/loadRRDD';
import BottomTabBar from '../../component/widget/common/BottomTabBar';
import NavBar, {NAVBAR_NORMAL, NAVBAR_CLOSE, NAVBAR_SEARCH} from '../../component/widget/common/NavBar';
import GoodsList from '../../component/home/rrdd/GoodsList';
import {Tabs, WhiteSpace, List} from 'antd-mobile';
import router from '../../router';

const TabPane = Tabs.TabPane;

import '../../assets/pages/home/index.scss';

class RrddMainPage extends Component {
  static displayName = 'RrddMainPage';

  static propTypes = {
    selNow: PropTypes.number,
    loadBanner: PropTypes.func,
    bannerList: PropTypes.array,
    loadNav: PropTypes.func,
    navList: PropTypes.array,
    loadList: PropTypes.func,
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
    this.props.loadList();
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

    // todo 添加具体的内容
    return (
      <div>
      <GoodsList 
        loadList={this.props.loadList}
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
    bannerList,
    navList,
    articleData,
    isFetching,
    error
  } = state.page;
  return {bannerList, navList, articleData, isFetching, error};
}

export default connect(mapStateToProps, {
  loadList
})(RrddMainPage);
