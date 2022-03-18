import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/index-action';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                username: "",
                password: "",
                email: ""
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
        await this.props.register(this.state.object)
        this.setState({
            object: {
                username: "",
                password: "",
                email: ""
            }
        })
    }
    render() {
        return (
            <Fragment>
                <form className='container' style={{ maxWidth: "540px", marginTop: "100px", textAlign: "left" }} onSubmit={this.handleSubmit}>
                    <h2 className='text-center'>Đăng ký tài khoản</h2>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                        <input type="text" className="form-control" id="username" aria-describedby="username" name="username" value={this.state.object.username} onChange={this.handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control" id="password" name="password" value={this.state.object.password} onChange={this.handleOnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={this.state.object.email} onChange={this.handleOnChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Đăng ký</button>
                </form>
            </Fragment>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        register: async (ojbect) => {
            await dispatch(action.actRegister(ojbect));
        }
    }
}

export default connect(null, mapDispatchToProps)(Register);
