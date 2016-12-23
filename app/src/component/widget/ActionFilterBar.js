import {Popup, List, Button, Toast} from 'antd-mobile';
import React, {Component, PropTypes} from 'react';
import '../../assets/common/widget/filterBar.scss';


const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {};
}

const Test = React.createClass({

    getInitialState() {
        return {
            sel: '',
        };
    },

    onSort(type) {
        Toast.info(type, 1);
    },
    onClick() {
        Popup.show(
            <List>
                <List.Item
                    onClick={() => {
                        this.onClose('cancel');
                        this.onSort('综合排序');
                    }}
                >综合排序</List.Item>
                <List.Item
                    onClick={() => {
                        this.onClose('cancel');
                        this.onSort('评论数从高到低');
                    }}
                >评论数从高到低</List.Item>
                <List.Item
                    onClick={() => {
                        this.onClose('cancel');
                        this.onSort('评论数从低到高');
                    }}
                >评论数从低到高</List.Item>
            </List>, {animationType: 'slide-down', wrapProps, maskClosable: true}
        );
    },
    onClose(sel) {
        this.setState({sel});
        Popup.hide();
    },

    componentDidMount() {
    },

    render() {
        return (<div className="screening">
            <hr className="horizontal-divider"/>
            <ul >
                <li className="sort" onClick={this.onClick}>智能排序
                    <hr className="divider"/>
                </li>
                <li className="sales-volume" onClick={this.onClick}>销量
                    <hr className="divider"/>
                </li>
                <li className="price" onClick={this.onClick}>价格
                    <hr className="divider"/>
                </li>
                <li className="filter" onClick={this.onClick}>筛选</li>
            </ul>
        </div>);
    },
});

export default Test;
