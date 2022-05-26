import React from 'react';
import { Route } from 'react-router-dom';
import Header from './../components/home/header';
import { connect } from 'react-redux';

const HomeLayout = props => {
    return (
        <>{props.children}</>
    )
}

function HomeTemplate({ Component, completeInfo, ...props }) {
    return (
        <Route  {...props} render={propsComponent => {
            return (
                <HomeLayout >
                    <Header {...propsComponent}
                        completeRender={completeInfo}
                    />
                    <Component {...propsComponent} />
                </HomeLayout>
            )
        }
        } />
    )
}


const mapStateToProps = state => {
    return {
        completeInfo: state.warningModalReducer.completeInfo
    };
};

export default connect(mapStateToProps, null)(HomeTemplate);
