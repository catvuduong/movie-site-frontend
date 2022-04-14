import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import WarningModal from '../../components/modals/warning-modal';
import * as action from './../../redux/actions/index-action';

function Admin({ login, ...props }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const [object, setObject] = useState({ username: '', password: '' });

    useEffect(() => {
        const admin = localStorage.getItem("Admin");
        if (admin) {
            props.history.push('dash-board');
        }
    });

    const handleOnchange = e => {
        let { name, value } = e.target;
        setObject({ ...object, [name]: value });
        name === 'username' ? errors.username = undefined : errors.password = undefined;
    }

    const onSubmit = async () => {
        await login(object, "loginAtAdmin");
        await setObject({ username: "", password: "" });
    }

    return (
        <div className='admin'>
            <div className='admin-main'>
                <div className='container'>
                    <h3 className='admin-title'>ADMIN SIGN IN</h3>
                    <form className='admin-form' onSubmit={(handleSubmit(onSubmit))}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control admin-username" name="username"
                                {...register("username", { required: true })}
                                onChange={handleOnchange}
                                value={object.username}
                            />
                            {errors.username ? <div className='text-danger'>Bạn tên cần nhập tài khoản</div> : undefined}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control admin-password" name="password"
                                {...register("password", { required: true })}
                                onChange={handleOnchange}
                                value={object.password}
                            />
                            {errors.password ? <div className='text-danger'>Bạn cần nhập mật khẩu</div> : undefined}
                        </div>
                        <button type="submit" className="btn btn-success admin-signin">
                            Sign in
                        </button>
                    </form>
                </div>
                <WarningModal />
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        login: (user, history) => {
            dispatch(action.actLogin(user, history))
        }
    }
}

export default connect(null, mapDispatchToProps)(Admin);
