import React, { Component } from 'react'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            icon: "",
            img: ""
        }
    }
    componentDidMount() {
        if (localStorage.getItem("Admin") || localStorage.getItem("User")) {
            this.setState({
                icon: "none",
                img: "inline-block"
            })
        } else {
            this.setState({
                icon: "inline-block",
                img: "none"
            })
        }
    }
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
                            <i style={{ display: this.state.icon }} className="fa fa-user" />
                            <img style={{ display: this.state.img }} src="/images/tiec-trang-mau-blood-moon-party-16021267739246.png" alt="" />
                            <button data-toggle="modal" data-target="#loginModal" className="btn btn--signIn">Đăng Nhập</button>
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

