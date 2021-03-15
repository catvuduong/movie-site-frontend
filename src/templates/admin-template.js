import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';

const AdminLayout = props => {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

export default function AdminTemplate({ Component, ...props }) {
    return (
        <Route {...props} render={propsComponent => {
            if (localStorage.getItem('Admin')) {
                return (
                    <AdminLayout>
                        <Component {...propsComponent} />
                    </AdminLayout>
                )
            } else {
                return <Redirect to="/admin"></Redirect>
            }
        }} />
    )
}
