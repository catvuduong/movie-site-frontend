import React, { Component } from 'react'
import { Fragment } from 'react';
import { connect } from 'react-redux';
import * as action from "./../../redux/actions/index-action";

class BookingTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTicket: {},
            listArticles: [],
            theater: {}
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.props.getShowtimeById(id);
        this.setState({ theater: this.props.showtime.theater })
    }

    sendSeatData = (data, index) => {
        let seat = {};
        data.index = index;
        seat = { ...data }
        // console.log(seat);
    }

    renderSeat = () => {
        let a = 1; let arr = []; let l = 160;
        for (let i = 0; i < l; i++) {
            let seat = {
                name: `${a}`,
                index: null,
                status: false,
                vip: false,
            }
            arr.push(seat);
            a++;
        }
        return arr.map((item, index) => {
            if ((index + 1) % 16 === 0) {
                return (
                    <Fragment key={index}>
                        <i className="fa fa-minus-square" onClick={() => this.sendSeatData(item, index)}></i>
                        <br />
                    </Fragment >
                )
            }
            return <i key={index} className="fa fa-minus-square" onClick={() => this.sendSeatData(item, index)}></i>;
        })
    }

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
                                    <img src="/images/screen.png" alt="" />
                                </div>
                                <div>{this.renderSeat()}</div>
                                <div className="seat_status">
                                    <div className="row">
                                        <div className="col-3 seating"><i className="fa fa-minus-square"></i> Ghế đang chọn</div>
                                        <div className="col-3 seated"><i className="fa fa-minus-square"></i> Ghế đã chọn</div>
                                        <div className="col-3 havent_seat"><i className="fa fa-minus-square"></i> Ghế chưa chọn</div>
                                        <div className="col-3 vip_seat"><i className="fa fa-minus-square"></i> Ghế vip</div>
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

const mapStateToProps = state => {
    return {
        showtime: state.bookingTicketReducer.showtime,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getShowtimeById: async id => {
            await dispatch(action.actGetShowtimeByID(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingTicket);


