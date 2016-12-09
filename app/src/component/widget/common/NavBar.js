import React, {Component, PropTypes} from 'react';
import {SearchBar} from 'antd-mobile';
import router from '../../../router';
import isEmpty from 'lodash/isEmpty';

import '../../../assets/common/widget/navBar.scss';


export const NAVBAR_NORMAL = 'NAVBAR_NORMAL';
export const NAVBAR_CLOSE = 'NAVBAR_CLOSE';
export const NAVBAR_SEARCH = 'NAVBAR_SEARCH';

export default class NavBar extends Component {
  static displayName = 'widgetNavBar';

  static propTypes = {
    navbarType: PropTypes.string,
    hasBack: PropTypes.bool,
    title: PropTypes.string,
    onClose: PropTypes.func
  }

  static defaultProps = {
    hasBack: false
  }

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  onChange = (value) => {
    this.setState({value});
  }

  clear = () => {
    this.setState({ value: '' });
  }

  onSubmit = () => {
    console.log('onSubmit');
  }



  renderTitle(cssName) {
    const title = this.props.title;

    if (isEmpty(title)) {
      return (
        <div className="am-navbar-logo"></div>
      )
    }

    return (
      <div className={cssName}>{title}</div>
    );
  }

  //普通导航 右侧搜索按钮
  renderNormal() {
    const hasBack = this.props.hasBack;
    let backDom = null;
    let titleCss = 'am-navbar-title-l';

    if (hasBack) {
      backDom = (
        <div className="am-navbar-left" onClick={() => {
          window.history.back();
        }}>
          <span className="am-navbar-left-icon" />
          <span className="am-navbar-left-content">返回</span>
        </div>
      )
    }

    return (
      <div className="am-navbar am-navbar-light">
        {backDom}
        {this.renderTitle(`am-navbar-title ${titleCss}`)}
        <div className="am-navbar-right" onClick={() => {
          //跳转搜索页面
          location.href = router['search'];
        }}>
          <i type="search" className="anticon anticon-search" />
        </div>
      </div>
    )
  }

  //浮层导航带关闭按钮
  renderClose() {
    return (
      <div className="am-navbar am-navbar-light">
        {this.renderTitle('am-navbar-title am-navbar-title-l')}
        <div className="am-navbar-right" onClick={() => {
          this.props.onClose && this.props.onClose();
        }}>
          <i className="anticon anticon-cross" />
        </div>
      </div>
    )
  }

  //搜索导航
  renderSearch() {

    return (
      <div className="am-navbar am-navbar-light am-navbar-search">
        <SearchBar
          value={this.state.value}
          placeholder="搜索"
          cancelText=""
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />
        <div className="am-navbar-right" onClick={() => {
          this.props.onClose && this.props.onClose();
        }}>
          <i className="anticon anticon-cross" />
        </div>
      </div>
    );
  }



  render() {
    const {navbarType} = this.props;

    switch (navbarType){

      case NAVBAR_NORMAL:{
        return this.renderNormal();
      }
      case NAVBAR_CLOSE:{
        return this.renderClose();
      }
      case NAVBAR_SEARCH:{
        return this.renderSearch();
      }
      default: {
        return null;
      }
    }

  }
}
