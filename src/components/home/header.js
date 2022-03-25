import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { scroller } from 'react-scroll'

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

    componentDidUpdate() {
        // console.log(this.props.completeRender);
    }


    scrollTo = name => {
        scroller.scrollTo(name, {
            duration: 1,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }


    backToHomePage = async id => {
        await this.props.history.push('/');
        // if (await this.props.completeRender === 'complete_render') {
        //     await this.scrollTo(id);
        // }
        await setTimeout(() => {
            this.scrollTo(id);
        }, 500);
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
                                onClick={() => { this.backToHomePage('srollToHome') }}
                            />
                        </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse navbar_content" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a onClick={() => { this.backToHomePage('srollToListMovie') }} className="nav-link" href="#listMovie">
                                        Lịch Chiếu
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={() => { this.backToHomePage('srollToCinema') }} className="nav-link" href="#cinema">
                                        Cụm Rạp
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={() => { this.backToHomePage('srollToArticle') }} className="nav-link" href="#article">
                                        Tin Tức
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={() => { this.backToHomePage('srollToApp') }} className="nav-link" href="#apps">
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

