import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import { Element } from 'react-scroll';

export default class Apps extends Component {
    render() {
        const params = {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
        }
        return (
            <Element name='srollToApp' className="myApps" style={{ backgroundImage: `url(./images/backapp.jpg)` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 app_intro">
                            <h3>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h3>
                            <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẵn.</p>
                            <button className="">App miễn phí - Tải về ngay!</button>
                            <p>Có hai phiên bản iOS & Android</p>
                        </div>
                        <div className="col-sm-6 app_phone">
                            <div className="phone_content">
                                <Swiper {...params} >
                                    <div>
                                        <div className="phone_item">
                                            <img src="./images/slide2.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="phone_item">
                                            <img src="./images/slide3.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="phone_item">
                                            <img src="./images/slide4.jpg" alt="" />
                                        </div>
                                    </div>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </Element>
        )
    }
}
