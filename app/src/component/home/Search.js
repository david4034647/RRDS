import React, {Component, PropTypes} from 'react';
import {Tabs, WhiteSpace, List} from 'antd-mobile';


const TabPane = Tabs.TabPane;


export default class Search extends Component {
  static displayName = 'HomeSearch';

  static propTypes = {
  }



  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  callback = (key) => {
    console.log(key);
  }


  render() {
    // todo 添加具体的内容
    return (
      <Tabs defaultActiveKey="1" animated={true} tabBarPosition="top" onChange={this.callback}>
        <TabPane tab="作者" key="1">
          <List>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者1</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者2</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者3</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >作者4</List.Item>
          </List>
        </TabPane>
        <TabPane tab="文章" key="2">
          <List>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >文章1</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >文章2</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >文章3</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >文章4</List.Item>
          </List>
        </TabPane>
        <TabPane tab="地名" key="3">
          <List>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >地名1</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >地名2</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >地名3</List.Item>
            <List.Item
              onClick={() => {}}
              extra={undefined}
            >地名4</List.Item>
          </List>
        </TabPane>
      </Tabs>
    );
  }
}
