import React from 'react';
import { Route } from 'react-router-dom';
import Header from './../components/home/header';

const HomeLayout = props => {
    return (
        <>{props.children}</>
    )
}

export default function HomeTemplate({ Component, ...props }) {
    return (
        <Route  {...props} render={propsComponent => {
            // console.log('From template:', propsComponent);
            return (
                <HomeLayout >
                    <Header {...propsComponent} />
                    <Component {...propsComponent} />
                </HomeLayout>
            )
        }
        } />
    )
}
