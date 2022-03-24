import React, { Component } from 'react';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            icon: "",
            img: "",
            backHomePage: false,
            signIn: null,
            toggle: true,
            userDropdown: { display: 'none' }
        }
    }
    componentDidMount() {
        const admin = JSON.parse(localStorage.getItem("Admin"));
        const user = JSON.parse(localStorage.getItem("User"));
        if (admin) {
            this.setState({
                icon: "none",
                img: "inline-block",
                signIn: admin.username,
            })
        } else if (user) {
            this.setState({
                icon: "none",
                img: "inline-block",
                signIn: user.username,
            })
        } else {
            this.setState({
                icon: "inline-block",
                img: "none"
            })
        }
    }

    backToHomePage = (id) => {
        switch (id) {
            case "#myCarousel":
                this.checkLocation(id);
                break;
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
        if (id === "#myCarousel") {
            await this.props.history.push('/');
            await setTimeout(() => {
                $('html, body').animate({
                    scrollTop: $(id).offset().top
                }, "fast");
            }, 500)
        }
    }

    handleDropdown = () => {
        if (this.state.signIn) {
            if (this.state.toggle) {
                this.setState(
                    {
                        toggle: !this.state.toggle,
                        userDropdown: { display: 'block' }
                    }
                );
            } else {
                this.setState(
                    {
                        toggle: !this.state.toggle,
                        userDropdown: { display: 'none' }
                    }
                );
            }

        }
    }

    handleSignOut = () => {
        const admin = JSON.parse(localStorage.getItem("Admin"));
        const user = JSON.parse(localStorage.getItem("User"));
        if (admin) {
            window.localStorage.removeItem("Admin");
            window.location.reload();
        } else if (user) {
            window.localStorage.removeItem("User");
            window.location.reload();
        }
    }

    render() {
        return (
            <header className='myHeader'>
                <div className='container'>
                    <nav className="navbar navbar-expand-lg navbar-light navbar_contain">
                        <div className='header_logo'>
                            <img className='logo_image' src="/images/friday-cinema.png" alt=""
                                onClick={() => { this.checkLocation("#myCarousel") }}
                            />
                        </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse navbar_content" id="navbarNav">
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
                                    <a onClick={() => { this.backToHomePage("#apps",) }} className="nav-link" href="#apps">
                                        Ứng Dụng
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <h4 className='user_title'>Chức năng người dùng</h4>
                                    <div className='user_function'>
                                        <div className="navbar_signIn">
                                            <button
                                                className='signIn_button'
                                                data-toggle={this.state.signIn ? null : 'modal'}
                                                data-target={this.state.signIn ? null : '#loginModal'}
                                            >
                                                <i
                                                    className="fa fa-user"
                                                    style={{ display: this.state.icon }}

                                                />
                                            </button>
                                            <div className="user-dropdown"
                                            >
                                                <div onClick={() => this.handleDropdown()}>
                                                    <img className='user-image' style={{ display: this.state.img }} src="/images/tiec-trang-mau-blood-moon-party-16021267739246.png" alt=""
                                                    />
                                                    <button
                                                        className="btn btn--signIn"
                                                        data-toggle={this.state.signIn ? null : 'modal'}
                                                        data-target={this.state.signIn ? null : '#loginModal'}
                                                    >
                                                        {this.state.signIn ? this.state.signIn : "Đăng nhập"}
                                                    </button>
                                                </div>
                                                {
                                                    this.state.signIn ?
                                                        (
                                                            <div
                                                                className="dropdown-content user-content"
                                                                style={this.state.userDropdown}
                                                            >
                                                                <button
                                                                    onClick={() => this.handleSignOut()}
                                                                >Đăng xuất
                                                                </button>
                                                            </div>
                                                        )
                                                        : null
                                                }
                                            </div>
                                        </div>
                                        <div className="narbar_signUp">
                                            <NavLink className="btn btn--signUp" to={'/register'} >
                                                <i className="fa fa-map-marker-alt" />
                                            </NavLink>
                                            <NavLink className='signUp_text' to={'/register'}>
                                                Đăng Ký
                                            </NavLink>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar_login">
                            <div className="navbar_signIn">
                                <button
                                    className='signIn_button'
                                    data-toggle={this.state.signIn ? null : 'modal'}
                                    data-target={this.state.signIn ? null : '#loginModal'}
                                >
                                    <i
                                        className="fa fa-user"
                                        style={{ display: this.state.icon }}

                                    />
                                </button>
                                <div className="user-dropdown">
                                    <div onClick={() => this.handleDropdown()}>
                                        <img className='user-image' style={{ display: this.state.img }} src="/images/tiec-trang-mau-blood-moon-party-16021267739246.png" alt=""
                                        />
                                        <button
                                            className="btn btn--signIn"
                                            data-toggle={this.state.signIn ? null : 'modal'}
                                            data-target={this.state.signIn ? null : '#loginModal'}
                                        >
                                            {this.state.signIn ? this.state.signIn : "Đăng nhập"}
                                        </button>
                                    </div>
                                    {
                                        this.state.signIn ?
                                            (
                                                <div
                                                    className="dropdown-content user-content"
                                                    style={this.state.userDropdown}
                                                >
                                                    <button
                                                        onClick={() => this.handleSignOut()}
                                                    >
                                                        Đăng xuất
                                                    </button>
                                                </div>
                                            )
                                            : null
                                    }
                                </div>
                            </div>
                            <div className="narbar_signUp">
                                <NavLink className="btn btn--signUp" to={'/register'} >
                                    <i className="fa fa-map-marker-alt" />
                                </NavLink>
                                <NavLink className='signUp_text' to={'/register'}>
                                    Đăng Ký
                                </NavLink>
                            </div>
                        </div>
                    </nav>
                </div>

            </header >
        )
    }
}

