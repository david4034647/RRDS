import {Popup, List, Button, Toast} from 'antd-mobile';
import {getPopupDomNode} from 'antd-mobile';
import React, {Component, PropTypes} from 'react';
import '../../../assets/common/widget/filterBar.scss';
import arrow1 from '../../../assets/common/widget/images/arrow_down_black.png';
import arrow2 from '../../../assets/common/widget/images/arrow_down_red.png';
import arrow3 from '../../../assets/common/widget/images/arrow_up_black.png';
import arrow4 from '../../../assets/common/widget/images/arrow_up_red.png';
import filter from '../../../assets/common/widget/images/icon_filter.png';
import filterItem from '../../../assets/common/widget/images/icon_filter_item.png';

import {findDOMNode} from 'react-dom';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {};
}

const popup = Popup.newInstance();

export default  class ActionFilterBar extends Component {

    constructor() {
        super();

        this.state = {
            sel: '',
            selectItem: 1,
            selectedSubItem: 1,
        };
    }

    static propTypes = {
        onFilterClick: PropTypes.func,
    };

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
    }

    componentDidMount() {
        console.log("componentDidMount");
    }


    onSort(type) {
        Toast.info(type, 1);
    }

    showPopupWindow() {
        const subItemSelected = this.state.selectedSubItem;
        popup.show(
            <List>
                <List.Item
                    onClick={() => {
                        this.onSort('综合排序');
                        this.selectSubItem(1);
                    }}>
                    <span className={subItemSelected == 1 ? "subItemSelected" : "subItem"}>综合排序</span>
                    <img src={filterItem} className={subItemSelected == 1 ? "iconChooseSelected" : "iconChoose"}/>
                </List.Item>
                <List.Item
                    onClick={() => {
                        this.onSort('评论数从高到低');
                        this.selectSubItem(2);
                    }}>
                    <span className={subItemSelected == 2 ? "subItemSelected" : "subItem"}>评论数从高到低</span>
                    <img src={filterItem} className={subItemSelected == 2 ? "iconChooseSelected" : "iconChoose"}/>
                </List.Item>
                <List.Item
                    onClick={() => {
                        this.onSort('评论数从低到高');
                        this.selectSubItem(3);
                    }}>
                    <span className={subItemSelected == 3 ? "subItemSelected" : "subItem"}>评论数从低到高</span>
                    <img src={filterItem} className={subItemSelected == 3 ? "iconChooseSelected" : "iconChoose"}/>
                </List.Item>
            </List>, {animationType: 'slide-down', wrapProps, maskClosable: true, onMaskClose: this.onClose}
        );
    }

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
                Toast.info("筛选", 1);
                this.setState({
                    selectItem: 4
                });
                break;
        }
    }

    selectSubItem(type) {
        popup.hide();
        this.setState({
            selectItem: 1,
            selectedSubItem: type
        });
    }

    onClose() {
        // const prevItem = this.state.prevSelectItem;
        // console.log("prevSelectItem: " + prevItem + " SelectItem: " + this.state.selectItem);
        // this.setState({
        //     selectItem: prevItem
        // });
    }

    render() {
        const selectedItem = this.state.selectItem;
        return (<div className="screening">
            <hr className="horizontal-divider"/>
            <ul>
                <li className="sort" onClick={() => {
                    this.handleFilterClick(1);
                }}>
                    <span className={selectedItem == 1 ? "filter-selected" : ""}>智能排序</span>
                    <img src={selectedItem == 1 ? arrow2 : arrow3} className="img-arrow"/>
                    <hr className="divider"/>
                </li>
                <li className="sales-volume" onClick={() => {
                    this.handleFilterClick(2);
                }}>
                    <span className={selectedItem == 2 ? "filter-selected" : ""}>销量</span>
                    <img src={selectedItem == 2 ? arrow2 : arrow3} className="img-arrow"/>
                    <hr className="divider"/>
                </li>
                <li className="price" onClick={() => {
                    this.handleFilterClick(3);
                }}>
                    <span className={selectedItem == 3 ? "filter-selected" : ""}>价格</span>
                    <img src={selectedItem == 3 ? arrow2 : arrow3} className="img-arrow"/>
                    <hr className="divider"/>
                </li>
                <li className="filter" onClick={
                    this.props.onFilterClick
                    // () => {
                    //this.handleFilterClick(4);
                    //}
                }>
                    <span className={selectedItem == 4 ? "filter-selected" : ""}>筛选</span>
                    <img src={filter} className="img-filter"/>
                </li>
            </ul>
        </div>)
    }
}
