import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from './../components/home/header';

const HomeLayout = props => {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

export default function HomeTemplate({ Component, ...props }) {
    return (
        <Route {...props} render={propsComponent => (
            <HomeLayout>
                <Header></Header>
                <Component {...propsComponent} />
            </HomeLayout>
        )} />
    )
}
