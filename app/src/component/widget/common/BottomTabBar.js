import React, {Component, PropTypes} from 'react';
import {TabBar} from 'antd-mobile';
import router from '../../../router';
import iconOn01 from '../../../assets/common/widget/images/icon_bottom01_on.png';
import iconOff01 from '../../../assets/common/widget/images/icon_bottom01_off.png';
import iconOn02 from '../../../assets/common/widget/images/icon_bottom02_on.png';
import iconOff02 from '../../../assets/common/widget/images/icon_bottom02_off.png';
import iconOn03 from '../../../assets/common/widget/images/icon_bottom03_on.png';
import iconOff03 from '../../../assets/common/widget/images/icon_bottom03_off.png';

import '../../../assets/common/widget/bottomTabBar.scss';

export default class BottomTabBar extends Component {
  static displayName = 'widgetBottomTabBar';

  static propTypes = {
    selNow: PropTypes.number,
    // todo 添加需要的参数
    children: PropTypes.any
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0
    };
  }


  handleBottomClick(tab) {
    location.href = router[`root${tab}`];
  }

  renderContent(pageText, num) {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

  render() {
    const {selNow} = this.props;

    // todo 添加具体的内容
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          key="生活"
          icon={{ uri: iconOff01 }}
          selectedIcon={{ uri: iconOn01 }}
          selected={selNow === 1}
          onPress={() => {
            this.handleBottomClick(1);
            /*
            this.setState({
              selectedTab: 'blueTab',
            });
            */
          }}
        >
          {this.renderContent('生活 Tab')}
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: iconOff02 }}
          selectedIcon={{ uri: iconOn02 }}
          key="口碑"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={selNow === 2}
          onPress={() => {
            this.handleBottomClick(2);
            /*
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
             */
          }}
        >
          {this.renderContent('口碑 Tab', this.state.notifCount)}
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: iconOff03 }}
          selectedIcon={{ uri: iconOn03 }}
          key="朋友"
          selected={selNow === 3}
          onPress={() => {
            this.handleBottomClick(3);
            /*
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1,
            });
             */
          }}
        >
          {this.renderContent('我的', this.state.presses)}
        </TabBar.Item>


        <TabBar.Item
          icon={{ uri: iconOff01 }}
          selectedIcon={{ uri: iconOn01 }}
          key="兜兜"
          selected={selNow === 4}
          onPress={() => {
            this.handleBottomClick(4);
            /*
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1,
            });
             */
          }}
        >
          {this.renderContent('兜兜', this.state.presses)}
        </TabBar.Item>
      </TabBar>
    );
  }
}
