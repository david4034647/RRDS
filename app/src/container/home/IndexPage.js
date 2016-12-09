import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadBanner, loadNav, loadList} from '../../action/home/loadIndex';
import BottomTabBar from '../../component/widget/common/BottomTabBar';
import NavBar, {NAVBAR_NORMAL, NAVBAR_CLOSE, NAVBAR_SEARCH} from '../../component/widget/common/NavBar';
import ArticleList from '../../component/home/index/ArticleList';
import Carousel from '../../component/home/index/Carousel';
import Banner from '../../component/home//index/Banner';

import '../../assets/pages/home/index.scss';

class IndexPage extends Component {
  static displayName = 'HomeIndexPage';

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
    selNow: 1
  };

  componentWillMount() {
    this.props.loadBanner();
    this.props.loadNav();
    this.props.loadList();
  }

  componentDidMount() {

  }


  render() {
    const {selNow} = this.props;
    const tabBarProps = {
      selNow
    }
    // todo 添加具体的内容
    return (
      <BottomTabBar {...tabBarProps}>
        <NavBar navbarType={NAVBAR_NORMAL}/>

        <Banner bannerList={this.props.bannerList}/>

        <Carousel navList={this.props.navList}/>

        <ArticleList
          loadList={this.props.loadList}
          isFetching={this.props.isFetching}
          error={this.props.error}
          {...this.props.articleData}
        />

      </BottomTabBar>
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
  loadBanner, loadNav, loadList
})(IndexPage);
