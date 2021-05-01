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
                    <div className="banner_contact"></div>
                </div>
            </section>
        )
    }
}
