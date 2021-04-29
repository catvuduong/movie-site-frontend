import React, { Component } from 'react'

export default class Apps extends Component {
    render() {
        return (
            <section className="myApps" style={{ backgroundImage: `url(./images/backapp.jpg)` }}>

                <div className="container">
                    <div className="row">
                        <div className="col-6 app_intro">
                            <h3>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h3>
                            <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẵn.</p>
                            <button className="">App miễn phí - Tải về ngay!</button>
                            <p>Có hai phiên bản iOS & Android</p>
                        </div>
                        <div className="col-6 app_phone"></div>
                    </div>
                </div>
            </section>
        )
    }
}
