import React, { Component } from 'react';
import $ from 'jquery';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            icon: "",
            img: "",
            backHomePage: false
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

    backToHomePage = id => {
        switch (id) {
            case "#listMovie":
                this.checkLocation(id);
                break;
            case "#cinema":
                this.checkLocation(id);
                break;
            case "#article":
                this.checkLocation(id);
                break;
            case "#apps":
                this.checkLocation(id);
                break;
            default:
                break;
        }
    }

    checkLocation = async id => {
        if (await this.props.location.pathname !== '/') {
            await this.props.history.push('/');
            await setTimeout(() => {
                $('html, body').animate({
                    scrollTop: $(id).offset().top
                }, "fast");
            }, 3500);
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
                                    <a onClick={() => { this.backToHomePage("#listMovie") }} className="nav-link" href="#listMovie">
                                        Lịch Chiếu
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={() => { this.backToHomePage("#cinema") }} className="nav-link" href="#cinema">
                                        Cụm Rạp
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={() => { this.backToHomePage("#article") }} className="nav-link" href="#article">
                                        Tin Tức
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={() => { this.backToHomePage("#apps") }} className="nav-link" href="#apps">
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

