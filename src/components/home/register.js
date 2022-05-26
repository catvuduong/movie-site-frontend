import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/index-action'

function Register({ _register }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const [object, setObject] = useState({ username: '', password: '', email: '' });

    const handleOnChange = e => {
        let { name, value } = e.target;
        setObject({ ...object, [name]: value });
        name === 'username' ? errors.username = undefined : errors.password = undefined;
        if (name === 'username') {
            errors.username = undefined;
        } else if (name === 'password') {
            errors.password = undefined;
        } else {
            errors.email = undefined;
        }
    }

    const onSubmit = async () => {
        await _register(object);
        await setObject({ username: '', password: '', email: '' });
    };

    return (
        <form className='container' style={{ maxWidth: "540px", marginTop: "100px", textAlign: "left" }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className='text-center'>Đăng ký tài khoản</h2>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                <input type="text" className="form-control" name="username"
                    {...register("username", { required: true, minLength: 3, maxLength: 12, pattern: /^[A-Z0-9._%+-]+$/i })}
                    onChange={handleOnChange}
                    value={object.username}
                />
                {errors.username?.type === 'required' && <div className='text-danger'>Bạn cần nhập tên tài khoản.</div>}
                {errors.username?.type === 'minLength' && <div className='text-danger'>Tên toàn khoản từ 3 đến 12 ký tự.</div>}
                {errors.username?.type === 'maxLength' && <div className='text-danger'>Tên tài khoản tối đa chỉ 12 ký tự.</div>}
                {errors.username?.type === 'pattern' && <div className='text-danger'>Tên tài khoản không thể có ký tự đặc biệt.</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input type="password" className="form-control" name="password"
                    {...register("password", { required: true, minLength: 6, maxLength: 12, pattern: /^[A-Z0-9._%+-]+$/i })}
                    onChange={handleOnChange}
                    value={object.password}
                />
                {errors.password?.type === 'required' && <div className='text-danger'>Bạn cần nhập mật khẩu.</div>}
                {errors.password?.type === 'minLength' && <div className='text-danger'>Mật khẩu từ 6 đến 12 ký tự.</div>}
                {errors.password?.type === 'maxLength' && <div className='text-danger'>Mật khẩu tối đa chỉ 12 ký tự.</div>}
                {errors.password?.type === 'pattern' && <div className='text-danger'>Mật khẩu không cho phép ký tự đặc biệt.</div>}

            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" className="form-control" name="email" placeholder='example@gmail.com'
                    {...register("email", {
                        required: true,
                        maxLength: 30,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    })}
                    onChange={handleOnChange}
                    value={object.email}
                />
                {errors.email?.type === 'required' && <div className='text-danger'>Bạn cần nhập email.</div>}
                {errors.email?.type === 'maxLength' && <div className='text-danger'>Email tối đa 30 ký tự.</div>}
                {errors.email?.type === 'pattern' && <div className='text-danger'>Email không đúng định dạng.</div>}
            </div>
            <button type="submit" className="btn btn-success">Đăng ký</button>
        </form >
    );
}


const mapDispatchToProps = dispatch => {
    return {
        _register: async (object) => {
            await dispatch(action.actRegister(object));
        }
    }
}

export default connect(null, mapDispatchToProps)(Register);
