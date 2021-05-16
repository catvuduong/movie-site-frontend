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
        seat = { ...data };
        console.log(seat);
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
            let condi = (
                index === 34 || index === 35 || index === 36 || index === 37 || index === 38 || index === 39 || index === 40 || index === 41 || index === 42 || index === 43 || index === 44 || index === 45 ||
                index === 50 || index === 51 || index === 52 || index === 53 || index === 54 || index === 55 || index === 56 || index === 57 || index === 58 || index === 59 || index === 60 || index === 61 ||
                index === 66 || index === 67 || index === 68 || index === 69 || index === 70 || index === 71 || index === 72 || index === 73 || index === 74 || index === 75 || index === 76 || index === 77 ||
                index === 82 || index === 83 || index === 84 || index === 85 || index === 86 || index === 87 || index === 88 || index === 89 || index === 90 || index === 91 || index === 92 || index === 93 ||
                index === 98 || index === 99 || index === 100 || index === 101 || index === 102 || index === 103 || index === 104 || index === 105 || index === 106 || index === 107 || index === 108 || index === 109 ||
                index === 114 || index === 115 || index === 116 || index === 117 || index === 118 || index === 119 || index === 120 || index === 121 || index === 122 || index === 123 || index === 124 || index === 125
            );
            if (condi) { item.vip = true; }
            if ((index + 1) % 16 === 0) {
                return (
                    <Fragment key={index}>
                        <i className={`fa fa-minus-square`} onClick={() => this.sendSeatData(item, index)}></i>
                        <br />
                    </Fragment >
                )
            }
            return <i key={index} className={`fa fa-minus-square ${item.vip ? "vip" : ""}`} onClick={() => this.sendSeatData(item, index)}></i>;
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
                                <div className="seat_customer">{this.renderSeat()}</div>
                                <div className="seat_status">
                                    <div className="row">
                                        <div className="col-3 seating"><i className="fa fa-minus-square"></i> Ghế đang chọn</div>
                                        <div className="col-3 seated"><i className="fa fa-minus-square"></i> Ghế đã chọn</div>
                                        <div className="col-3 havent_seat"><i className="fa fa-minus-square"></i> Ghế chưa chọn</div>
                                        <div className="col-3 vip_seat"><i className="fa fa-minus-square"></i> Ghế VIP</div>
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


