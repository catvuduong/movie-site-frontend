import React, { Component } from 'react'

export default class Seat extends Component {
    render() {
        return (
            <section className="mySeat">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9 seat">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6 theater">
                                        <img src="/images/bhd.png" alt="" />
                                        <div className="theater_info">
                                            <span>theater name</span>
                                            <span>show times</span>
                                        </div>
                                    </div>
                                    <div className="col-6 time">
                                        <div className="time_remaining">
                                            <span>Thời gian chờ</span>
                                            <span>4:00</span>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                </hr>
                                <div id="trapezium"></div>


                                <div className="text-center">Màn hình</div>
                                <div>Seats</div>
                                <div>Status of seats</div>
                            </div>
                        </div>
                        <div className="col-3 seat_info">Seat info</div>
                    </div>
                </div>
            </section>
        )
    }
}