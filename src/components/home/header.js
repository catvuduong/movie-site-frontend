import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <header className="navbar navbar-expand-md navbar-light myHeader">
                <div className="container">
                    <div className="navbar_contain">
                        <button
                            className="navbar-toggler"
                            data-toggle="collapse"
                            data-target="#myMenu"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse navbar_content" id="myMenu">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#listMovie">
                                        Lịch Chiếu
                                  </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#cinema">
                                        Cụm Rạp
                                 </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#article">
                                        Tin Tức
                                  </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#apps">
                                        Ứng Dụng
                                </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar_login">
                        <div className="navbar_signIn">
                            <i className="fa fa-user" />
                            <button className="btn btn--signIn">Đăng Nhập</button>
                        </div>
                        <div className="narbar_signUp">
                            <i className="fa fa-map-marker-alt" />
                            <button className="btn btn--signUp">Đăng Ký</button>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

