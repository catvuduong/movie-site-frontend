import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AdminLayout = props => {
    return (
        <>
            {props.children}
        </>
    )
}
export default function AdminTemplate({ Component, ...props }) {
    return (
        <Route
            {...props}
            render={(propsComponent) => {
                if (localStorage.getItem("Admin")) {
                    return (
                        <AdminLayout>
                            <Component {...propsComponent}>
                            </Component>
                            <ToastContainer />
                        </AdminLayout>
                    )
                } else {
                    return <Redirect to="/admin"></Redirect>
                }
            }}
        >
        </Route>
    )
}
