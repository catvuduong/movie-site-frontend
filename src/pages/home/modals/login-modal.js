import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action'
import $ from 'jquery';

function LoginModal({ login, showtimeId, ...props }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const [object, setObject] = useState({ username: '', password: '' });

    const handleOnChange = e => {
        let { name, value } = e.target;
        setObject({ ...object, [name]: value });
        name === 'username' ? errors.username = undefined : errors.password = undefined;
    }

    const onSubmit = async () => {
        await login(object, "loginHomePage")
        $('#loginModal').modal('hide');
        await setObject(
            {
                username: "",
                password: ""
            }
        )
        if (showtimeId) {
            const user = localStorage.getItem('User');
            const admin = localStorage.getItem('Admin');
            if (user || admin) {
                await props.history.push(`/booking-ticket/${showtimeId}`);
            }
        }
    };

    return (
        <div
            className="modal fade login"
            id="loginModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content login-content text-right">
                    <div className="modal-header">
                        <h5 className="modal-title">
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="text-left">
                                <div className="form-group">
                                    <label>Tên đăng nhập</label>
                                    <input type="text" className="form-control" name="username"
                                        {...register("username", { required: true })}
                                        onChange={handleOnChange} value={object.username}
                                    />
                                    {errors.username ? <div className='text-danger'>Bạn tên cần nhập tài khoản</div> : undefined}
                                </div>
                                <div className="form-group">
                                    <label>Mật khẩu</label>
                                    <input type="password" className="form-control" name="password"
                                        {...register("password", { required: true })}
                                        onChange={handleOnChange} value={object.password}
                                    />
                                    {errors.password ? <div className='text-danger'>Bạn cần nhập mật khẩu</div> : undefined}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success">
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        login: async (object, history) => {
            await dispatch(action.actLogin(object, history));
        }
    }
}

export default connect(null, mapDispatchToProps)(LoginModal);