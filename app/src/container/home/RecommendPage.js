import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import loadRecommend from '../../action/home/loadRecommend';
import BottomTabBar from '../../component/widget/common/BottomTabBar';
import NavBar, {NAVBAR_NORMAL, NAVBAR_CLOSE, NAVBAR_SEARCH} from '../../component/widget/common/NavBar';
import RecommendList from '../../component/home/Recommend/RecommendList';

import '../../assets/pages/home/recommend.scss';

class RecommendPage extends Component {
  static displayName = 'HomeRecommendPage';

  static propTypes = {
    selNow: PropTypes.number,
    loadRecommend: PropTypes.func,
    recommendData: PropTypes.object,
    isFetching: PropTypes.bool,
    error: PropTypes.bool
  };

  static defaultProps = {
    selNow: 2
  };

  componentWillMount() {
    this.props.loadRecommend();
  }

  componentDidMount() {

  }

  render() {
    const {selNow} = this.props;
    const tabBarProps = {
      selNow
    }
    return (
      <BottomTabBar {...tabBarProps}>
        <NavBar navbarType={NAVBAR_NORMAL} title="Recommended Author"/>

        <RecommendList
          loadRecommend={this.props.loadRecommend}
          isFetching={this.props.isFetching}
          error={this.props.error}
          {...this.props.recommendData}
        />

      </BottomTabBar>
    );
  }
}

function mapStateToProps(state) {
  const {
    recommendData,
    isFetching,
    error
  } = state.page;
  return {recommendData, isFetching, error};
}

export default connect(mapStateToProps, {
  loadRecommend
})(RecommendPage);
