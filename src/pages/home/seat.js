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
                                    <div className="col-6">Time remaining</div>
                                </div>
                                <hr></hr>
                                <div className="text-center">Minitor</div>
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