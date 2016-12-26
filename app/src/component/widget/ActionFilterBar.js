import {Popup, List, Button, Toast} from 'antd-mobile';
import {getPopupDomNode} from 'antd-mobile';
import React, {Component, PropTypes} from 'react';
import '../../assets/common/widget/filterBar.scss';
import arrow1 from '../../assets/common/widget/images/arrow_down_black.png';
import arrow2 from '../../assets/common/widget/images/arrow_down_red.png';
import arrow3 from '../../assets/common/widget/images/arrow_up_black.png';
import filter from '../../assets/common/widget/images/icon_filter.png';
import filterItem from '../../assets/common/widget/images/icon_filter_item.png';
import {findDOMNode} from 'react-dom';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {};
}

const ActionFilterBar = React.createClass({

    getInitialState() {
        return {
            sel: '',
            selectItem: 1,
        };
    },

    onSort(type) {
        Toast.info(type, 1);
    },

    showPopupWindow(){
        Popup.show(
            <List>
                <List.Item
                    onClick={() => {
                        this.onClose('cancel');
                        this.onSort('综合排序');
                        this.setState({
                            selectItem: 1
                        });
                    }}
                >综合排序
                    <img src={filterItem} className="iconChoose"/>
                </List.Item>
                <List.Item
                    onClick={() => {
                        this.onClose('cancel');
                        this.onSort('评论数从高到低');
                        this.setState({
                            selectItem: 1
                        });
                    }}
                >评论数从高到低</List.Item>
                <List.Item
                    onClick={() => {
                        this.onClose('cancel');
                        this.onSort('评论数从低到高');
                        this.setState({
                            selectItem: 1
                        });
                    }}
                >评论数从低到高</List.Item>
            </List>, {animationType: 'slide-down', wrapProps, maskClosable: true}
        );
    },

    handleFilterClick(type) {
        switch (type) {
            case 1:
                this.showPopupWindow();
                break;
            case 2:
                Toast.info("按销量排序", 1);
                this.setState({
                    selectItem: 2
                });
                break;
            case 3:
                Toast.info("按价格排序", 1);
                this.setState({
                    selectItem: 3
                });
                break;
            case 4:
                Toast.info("筛选11", 1);
                this.setState({
                    selectItem: 4
                });
                break;
        }
    },

    onClose(sel) {
        this.setState({sel});
        Popup.hide();
    },

    componentDidMount() {
        console.log("componentDidMount");
    },

    render() {
        const selectedItems = this.state.selectItem;
        return (<div className="screening">
            <hr className="horizontal-divider"/>
            <ul>
                <li className="sort" onClick={() => {
                    this.handleFilterClick(1);
                }}>
                    <span className={selectedItems == 1 ? "filter-selected" : ""}>智能排序</span>
                    <img src={selectedItems == 1 ? arrow2 : arrow3} className="img-arrow"/>
                    <hr className="divider"/>
                </li>
                <li className="sales-volume" onClick={() => {
                    this.handleFilterClick(2);
                }}>
                    <span className={selectedItems == 2 ? "filter-selected" : ""}>销量</span>
                    <img src={selectedItems == 2 ? arrow2 : arrow3} className="img-arrow"/>
                    <hr className="divider"/>
                </li>
                <li className="price" onClick={() => {
                    this.handleFilterClick(3);
                }}>
                    <span className={selectedItems == 3 ? "filter-selected" : ""}>价格</span>
                    <img src={selectedItems == 3 ? arrow2 : arrow3} className="img-arrow"/>
                    <hr className="divider"/>
                </li>
                <li className="filter" onClick={() => {
                    this.handleFilterClick(4);
                }}>
                    <span className={selectedItems == 4 ? "filter-selected" : ""}>筛选</span>
                    <img src={filter} className="img-filter"/>
                </li>
            </ul>
        </div>);
    },
});

export default ActionFilterBar;
