import React, { Component } from 'react'

export default class Cinema extends Component {
    render() {
        return (
            <section className="myCinema container">
                <div className="row">
                    <div className="col-1 cinema_logo cinema_line">
                        <div className="item_line">
                            <img className="" src="./images/rap-bhd.png" alt="" />
                        </div>
                        <div className="item_line">
                            <img className="" src="./images/rap-bhd.png" alt="" />
                        </div>
                        <div className="item_line">
                            <img className="" src="./images/rap-bhd.png" alt="" />
                        </div>
                        <div className="item_line">
                            <img className="" src="./images/rap-bhd.png" alt="" />
                        </div>
                        <div className="item_line">
                            <img className="" src="./images/rap-bhd.png" alt="" />
                        </div>
                        <div className="item_line">
                            <img className="" src="./images/rap-bhd.png" alt="" />
                        </div>
                    </div>
                    <div className="col-4 cinema_line"></div>
                    <div className="col-7 cinema_line"></div>
                </div>
            </section>
        )
    }
}
