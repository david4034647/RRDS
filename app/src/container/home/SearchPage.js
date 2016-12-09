import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import loadSearch from '../../action/home/loadSearch';
import BottomTabBar from '../../component/widget/common/BottomTabBar';
import NavBar, {NAVBAR_NORMAL, NAVBAR_CLOSE, NAVBAR_SEARCH} from '../../component/widget/common/NavBar';
import Search from '../../component/home/Search';


import '../../assets/pages/home/search.scss';

class SearchPage extends Component {
  static displayName = 'HomeSearchPage';

  static propTypes = {
    loadSearch: PropTypes.func
  };


  componentWillMount() {
    // this.props.loadSearch();
  }

  componentDidMount() {

  }

  // render() {
  //   return (
  //     <Search />
  //   );
  // }


  render() {
    // todo 添加具体的内容
    return (
      <div>
        <NavBar navbarType={NAVBAR_SEARCH} onClose={() => {
          window.history.back();
        }}/>

        <Search />
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  loadSearch
})(SearchPage);
