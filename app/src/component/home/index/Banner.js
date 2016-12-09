import React, {Component, PropTypes} from 'react';
import {Carousel, Flex} from 'antd-mobile';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

//重构资源
import img1 from '../../../assets/pages/home/images/banner1.jpg';
import img2 from '../../../assets/pages/home/images/banner2.jpg';

// console.log(a);

export default class Banner extends Component {
  static displayName = 'HomeIndexBanner';

  static propTypes = {
    bannerList: PropTypes.array
  }

  constructor(props) {
    super(props);

    this.state = {
      current: 1
    };
  }

  beforeSlide(from, to) {
    // console.log(`slide from ${from} to ${to}`);
  }

  slideTo(index) {
    // console.log('slide to', index);
  }

  render() {
    if (isEmpty(this.props.bannerList)) {
      return null;
    }


    const settings = {
      dots: true,
      autoplay: true,
      infinite: true,
      selectedIndex: this.state.current,
      beforeChange: this.beforeSlide,
      afterChange: this.slideTo,
    };
    return (
      <div>
        <div className="pagination-container" >
          <Carousel {...settings}>
            {this.props.bannerList.map((item, i) => {


              return (
                <Flex
                  key={i}
                  justify="center"
                  className="flex-container-justify"
                >
                  <div className="pic" style={{backgroundImage: `url('${item.ImgUrl}')`}}/>
                  <div className="title-wrap">
                    <div className="title">{item.Title}</div>
                  </div>
                  <div className="category">{item.Category}</div>
                </Flex>
              );
            })}
          </Carousel>
        </div>
      </div>
    );
  }
  // render() {
  //   //测试数据
  //   const data = [
  //     {
  //       icon: 'http://placeholder.qiniudn.com/750x346',
  //       text: '情侣',
  //       link: 'hehe',
  //     }, {
  //       icon: 'http://placeholder.qiniudn.com/750x346',
  //       text: '酒店',
  //       link: 'hehe',
  //     }, {
  //       icon: 'http://placeholder.qiniudn.com/750x346',
  //       text: '摄影',
  //       link: 'hehe',
  //     }, {
  //       icon: 'http://placeholder.qiniudn.com/750x346',
  //       text: '美食',
  //       link: 'hehe',
  //     }
  //   ];
  //
  //
  // }
}
