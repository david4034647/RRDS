import React, {Component, PropTypes} from 'react';
import {Carousel, Flex} from 'antd-mobile';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';


//重构资源
import img1 from '../../../assets/pages/home/images/nav1.jpg';
import img2 from '../../../assets/pages/home/images/nav2.jpg';
import img3 from '../../../assets/pages/home/images/nav3.jpg';

// console.log(a);

export default class Index extends Component {
  static displayName = 'HomeIndexCarousel';

  static propTypes = {
    navList: PropTypes.array
  }

  handleClick(item) {
    console.log(item);
  }


  render() {
    if (isEmpty(this.props.navList)) {
      return null;
    }

    const data = this.props.navList;


    const dataLength = data.length;
    const FlexCount = Math.ceil(dataLength / 4);
    // console.log(`FlexCount:${FlexCount}`);
    const gridContent = [];
    const carouselContent = [];
    const prefixCls = 'am-grid';

    // const itemCls = classNames({
    //   [`${prefixCls}-item`]: true,
    // });

    const itemCls = classNames([
      'nav-item',
      `${prefixCls}-item`
    ]);

    // const flexItemStyle = {
    //   // height: `${this.props.clientWidth / 4}px`,
    //   paddingTop: `${this.props.clientWidth / 16}px`
    // };


    for (let i = 0; i < FlexCount; i++) {
      const flexContent = [];
      for (let j = 0; j < 4; j++) {
        if ((i * 4) + j < dataLength) {

          const flexItemImageStyle = {
            backgroundImage: `url(${data[(i * 4) + j].CategoryImage})`
          }

          flexContent.push(<Flex.Item
            className={itemCls}
            style={{...flexItemImageStyle}}
            onClick={() => { this.handleClick(data[(i * 4) + j], ((i * 4) + j)); }}
            key={`griditem-${(i * 4) + j}`}
          >
            <div className={`${prefixCls}-icon`} />
            <div className={`${prefixCls}-text`}>{data[(i * 4) + j].CategoryName}</div>
          </Flex.Item>);
        } else {
          flexContent.push(<Flex.Item className="nav-item" key={`griditem-${(i * 4) + j}`} />);
        }
      }

      gridContent.push(<Flex key={`fridflex${i}`}>{flexContent}</Flex>);
    }
    // console.log(gridContent);

    const gridContentLength = gridContent.length;
    // console.log(`gridContentLength:${gridContentLength}`);
    for (let k = 0, len = Math.ceil(gridContentLength / 1); k < len; k++) {
      if (k * 1 < gridContentLength) {
        carouselContent.push();
      }
      if ((k * 1) + 1 < gridContentLength) {
        carouselContent.push(<div
          key={`carouselitem-${(k * 1) + 1}`}
        >
          {gridContent[k * 1]}

        </div>);
      } else {
        carouselContent.push(<div
          key={`carouselitem-${k * 1}`}
        >
          {gridContent[k * 1]}
          <Flex>
            <Flex.Item className={itemCls} />
            <Flex.Item className={itemCls} />
            <Flex.Item className={itemCls} />
            <Flex.Item className={itemCls} />
          </Flex>
        </div>);
      }
    }
    // console.log(carouselContent);

    return (

      <Carousel className="nav-list">
        {carouselContent}
      </Carousel>
    );
  }
}
