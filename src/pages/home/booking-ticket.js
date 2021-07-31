import React, { Component } from 'react'
import { Fragment } from 'react';
import { connect } from 'react-redux';
import * as action from "./../../redux/actions/index-action";
import moment from 'moment';

class BookingTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showtime: {},
            seatArr: [],
            seatedArr: [],
            totalPrice: 0
        }
    }

    async componentDidMount() {
        window.scrollTo(0, 0);
        this.countdownTimer(300);
        const id = this.props.match.params.id;
        await this.props.getShowtimeById(id);
        this.setState({ showtime: this.props.showtime })
        let seatArr = this.createSeatArr();
        this.setState({ seatArr })
    }

    sendSeatData = async (data, indexC, indexR) => {
        if (!data.bookedStatus) {
            let a = [...this.state.seatedArr];
            let findingIndex = this.state.seatedArr.findIndex(seat => (seat.verticalPos === indexC && seat.horizontalPos === indexR));
            if (findingIndex === -1) {
                //push into seat array.
                let seat = { ...data, verticalPos: indexC, horizontalPos: indexR };
                a.push(seat);
                //set status of seat in seatArr again.
                data.status = true;
            } else {
                //set status of seat in seatArr again.
                data.status = false;
                //remove seat out array.
                a.splice(findingIndex, 1);
            }
            await this.setState({ seatedArr: a });
            this.calculateTotalPrice();
        }
    }

    createSeatArr = () => {
        let r = 1; let c = 1; let arr = []; let row = 10; let col = 16;
        for (let i = 0; i < row; i++) {
            arr[i] = [];
            for (let j = 0; j < col; j++) {
                let seat = {
                    name: `${r}:${c}`,
                    vip: false,
                    status: false,
                    bookedStatus: false,
                }
                c++; if (c === 17) { c = 1 }
                arr[i].push(seat);
            }
            r++;
        }
        for (let i = 0; i < arr.length; i++) {
            let arrOut = arr[i];
            for (let j = 0; j < arrOut.length; j++) {
                let codiC = (i === 2 || i === 3 || i === 4 || i === 5 || i === 6 || i === 7);
                let codiR = (j === 3 || j === 4 || j === 5 || j === 6 || j === 7 || j === 8 || j === 9 || j === 10 || j === 11 || j === 12);
                if (codiC && codiR) {
                    arrOut[j].vip = true;
                }
            }
        }
        return arr
    }

    renderSeat = () => {
        return this.state.seatArr.map((item, indexC) => {
            return (
                <Fragment key={indexC}>
                    {item.map((item, indexR) => {
                        if (this.checkBookedSeats(indexC, indexR)) {
                            item.bookedStatus = true;
                        }
                        return <i key={indexR} className={`fa fa-minus-square ${item.bookedStatus ? "seated" : ""} ${item.status ? "seating" : ""} ${item.vip ? "vip" : ""}`}
                            onClick={() => this.sendSeatData(item, indexC, indexR)}></i>;
                    })}
                    <br />
                </Fragment >
            )
        })
    }

    calculateTotalPrice = () => {
        let { seatedArr } = this.state;
        let price = 0;
        seatedArr.map(item => {
            if (item.vip) {
                return price += 120;
            }
            return price += 100;
        });
        this.setState({ totalPrice: price })
    }

    countdownTimer = (duration) => {
        let display = document.getElementById("time");
        let timer = duration, minutes, seconds;
        let x = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.innerHTML = minutes + ":" + seconds;
            if (--timer < 0) {
                display.innerHTML = "Hết thời gian đặt vé."
                clearInterval(x);
            }
        }, 1000);
        if (display === null) {
            clearInterval(x);
        }
    }

    payTicket = () => {
        // console.log(this.state.seatedArr, this.state.totalPrice);
        const id = this.props.match.params.id;
        this.props.bookTicket(this.state.seatedArr, id);
    }

    checkBookedSeats = (indexC, indexR) => {
        let bookedSeats = [...this.state.showtime.bookedSeats];
        let findIndex = bookedSeats.findIndex(seats => (seats.verticalPos === indexC && seats.horizontalPos === indexR));
        if (findIndex !== -1) {
            return true;
        }
        return false;
    }

    render() {
        let theater = { ...this.state.showtime.theater };
        let movie = { ...this.state.showtime.movie };
        // console.log(this.state.seatArr);
        return (
            <section className="mySeat">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9 seat">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6 theater">
                                        <img src={"https://localhost:5001" + theater.image} alt="" />
                                        <div className="theater_info">
                                            <span>Rạp: {theater.name}</span>
                                            <span>{moment(this.state.showtime.time).format("HH:mm")}</span>
                                        </div>
                                    </div>
                                    <div className="col-6 time">
                                        <div className="time_remaining">
                                            <span>Thời gian chờ</span>
                                            <span id="time"></span>
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
                        <div className="col-3 display_board">
                            <div className="price"><span>{this.state.totalPrice}.000 đ</span></div>
                            <hr />
                            <div className="theater_info">
                                <span>{theater.name}</span><span>{movie.name}</span>
                                <p>Thời gian chiếu: {moment(this.state.showtime.time).format("HH:mm")}</p>
                                <p>Địa chỉ rạp: {theater.address}</p>
                            </div>
                            <hr />
                            <div className="seated">
                                <h5>Ghế đã chọn:</h5>
                                {this.state.seatedArr.map((item, index) => <span key={index}>Ghế số: {item.name}, </span>)}
                            </div>
                            <hr />
                            <div className="payments">
                                <h5>Hình thức thanh toán</h5>
                                <p>Vui lòng chọn ghế để hiển thị hình thức thanh toán.</p>
                                <p><i className="fa fa-info"></i> Vé đã mua không thể đổi hoặc hoàn tiền Mã vé sẽ được gửi qua tin nhắn <span>ZMS</span> (tin nhắn Zalo) và <span>Email</span> đã nhập.</p>
                            </div>
                            <hr />
                            <div className="accept_button">
                                <button onClick={() => this.payTicket()} > Thanh toán</button>
                            </div>
                            <hr />
                        </div>
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
        bookTicket: async (seatedArr, showtimeId) => {
            await dispatch(action.actBookTicket(seatedArr, showtimeId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingTicket);


