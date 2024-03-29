import React, { Component } from 'react'

export default class LoadingScreen extends Component {
    render() {
        return (
            <section className="loading" >
                <div className='loading-screen' id="preloader">
                    <img className='loading-image' src="/images/web-logo.png" alt="" />
                    <h3 className='loading-text'>Xin đợi trong giây lát.</h3>
                </div>
            </section>
        )
    }
}
