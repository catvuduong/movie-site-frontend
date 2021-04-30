import React, { Component } from 'react'

export default class Banner extends Component {
    render() {
        return (
            <section className="myBanner">
                <div className="container">
                    <div className="banner_partner">
                        <div className="row">
                            <div className="col-4">Partner</div>
                            <div className="col-4">Partner</div>
                            <div className="col-4">Partner</div>
                        </div>
                    </div>
                    <div className="banner_contact"></div>
                </div>
            </section>
        )
    }
}
