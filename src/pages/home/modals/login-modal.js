import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action'
import $ from 'jquery';

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                username: "",
                password: ""
            },
        }
    }

    handleOnChange = event => {
        let { name, value } = event.target;
        this.setState({
            object: { ...this.state.object, [name]: value }
        });

    }
    handleSubmit = async e => {
        e.preventDefault();
        await this.props.login(this.state.object, "loginHomePage")
        $('#loginModal').modal('hide');
        if (this.props.showtimeId) {
            const user = localStorage.getItem('User');
            const admin = localStorage.getItem('Admin');
            if (user || admin) {
                setTimeout(() => {
                    this.props.history.push(`booking-ticket/${this.props.showtimeId}`);
                }, 2000);
            }
        }
        this.setState({
            object: {
                username: "",
                password: ""
            }
        })
    }

    render() {
        return (
            <Fragment>
                <div
                    className="modal fade"
                    id="loginModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="modelTitleId"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content text-right">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {/* {this.props.objectEdit ? "EDIT BRANCH" : "ADD BRANCH"} */}
                                    Đăng Nhập
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="text-left">
                                        <div className="form-group">
                                            <label>Tên đăng nhập</label>
                                            <input type="text" className="form-control"
                                                onChange={this.handleOnChange} name="username" value={this.state.object.username}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Mật khẩu</label>
                                            <input type="password" className="form-control"
                                                onChange={this.handleOnChange} name="password" value={this.state.object.password}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success">
                                        {/* {this.props.objectEdit ? "Update" : "Submit"} */}
                                        Đăng nhập
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: async (ojbect, history) => {
            await dispatch(action.actLogin(ojbect, history));
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginModal);
