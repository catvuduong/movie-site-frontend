import React, { Component } from 'react'

export default class Banner extends Component {
    render() {
        return (
            <section className="myBanner">
                <div className="container">
                    <div className="banner_partner">
                        <div className="row">
                            <div className="col-4 security">
                                <h5>TIX</h5>
                                <div className="row">
                                    <div className="col-6">
                                        <h5>FAQ</h5>
                                        <h5>Brand Guidelines</h5>
                                    </div>
                                    <div className="col-6">
                                        <h5>Thỏa thuận sử dụng</h5>
                                        <h5>Chính sách bảo mật</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 partner">
                                <h5>ĐỐI TÁC</h5>
                                <div className="banner_icon">
                                    <div className="icon_line">
                                        <span><img src="./images/cgv.png" alt="" /></span>
                                        <span><img src="./images/bhd.png" alt="" /></span>
                                        <span><img src="./images/galaxycine.png" alt="" /></span>
                                        <span><img src="./images/cinestar.png" alt="" /></span>
                                        <span><img src="./images/lotte.png" alt="" /></span>
                                    </div>
                                    <div className="icon_line">
                                        <span><img src="./images/megags.png" alt="" /></span>
                                        <span><img src="./images/bt.jpg" alt="" /></span>
                                        <span><img src="./images/dongdacinema.png" alt="" /></span>
                                        <span><img src="./images/TOUCH.png" alt="" /></span>
                                        <span><img src="./images/cnx.jpg" alt="" /></span>
                                    </div>
                                    <div className="icon_line">
                                        <span><img src="./images/STARLIGHT.png" alt="" /></span>
                                        <span><img src="./images/dcine.png" alt="" /></span>
                                        <span><img src="./images/zalopay_icon.png" alt="" /></span>
                                        <span><img src="./images/payoo.jpg" alt="" /></span>
                                        <span><img src="./images/VIETTINBANK.png" alt="" /></span>
                                    </div>
                                    <div className="icon_line">
                                        <span><img src="./images/AGRIBANK.png" alt="" /></span>
                                        <span><img src="./images/VIETTINBANK.png" alt="" /></span>
                                        <span><img src="./images/IVB.png" alt="" /></span>
                                        <span><img src="./images/123go.png" alt="" /></span>
                                        <span><img src="./images/laban.png" alt="" /></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 apps">
                                <div className="row">
                                    <div className="col-6">
                                        <h5>MOBLE APP</h5>
                                        <span><img src="./images/apple-logo.png" alt="" /></span>
                                        <span><img src="./images/android-logo.png" alt="" /></span>
                                    </div>
                                    <div className="col-6">
                                        <h5>SOCIAL</h5>
                                        <span><img src="./images/facebook-logo.png" alt="" /></span>
                                        <span><img src="./images/zalo-logo.png" alt="" /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="banner_contact">
                        <div className="row">
                            <div className="col-1">
                                <img src="/images/zion-logo.jpg" alt="" />
                            </div>
                            <div className="col-8">
                                <h5>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</h5>
                                <p>Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.</p>
                                <p> Giấy chứng nhận đăng ký kinh doanh số: 0101659783, đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.</p>
                                <p>Số Điện Thoại (Hotline): 1900 545 436</p>
                                <p>Email: <span>support@tix.vn</span></p>
                            </div>
                            <div className="col-3">
                                <img src="/images/d1e6bd560daa9e20131ea8a0f62e87f8.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
