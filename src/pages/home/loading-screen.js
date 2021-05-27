import React, { Component } from 'react'

export default class LoadingScreen extends Component {
    render() {
        return (
            <section className="myLoadingScreen" >
                <div id="preloader" style={{ backgroundImage: `url(/images/backapp.jpg)` }}>
                    {/* <div id="loader"></div> */}
                    <div className="loader">
                        <span className="box"></span>
                        <span className="box"></span>
                        <div className="code">
                            <img src="/images/web-logo.png" width="120px" />
                        </div>
                        <span className="txt">LOADING</span>
                    </div>
                </div>
            </section>
        )
    }
}
