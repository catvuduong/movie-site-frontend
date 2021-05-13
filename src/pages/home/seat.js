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
                                <div className="screen">
                                    <img src="images/screen.png" alt="" />
                                </div>
                                <div>Seats</div>
                                <div className="seat_status">
                                    <div className="row">
                                        <div className="col-3 seating"><i class="fa fa-minus-square"></i> Ghế đang chọn</div>
                                        <div className="col-3 seated"><i class="fa fa-minus-square"></i> Ghế đã chọn</div>
                                        <div className="col-3 havent_seat"><i class="fa fa-minus-square"></i> Ghế chưa chọn</div>
                                        <div className="col-3 vip_seat"><i class="fa fa-minus-square"></i> Ghế vip</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 seat_info">Seat info</div>
                    </div>
                </div>
            </section>
        )
    }
}