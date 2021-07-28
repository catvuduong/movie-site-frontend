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
        const id = this.props.match.params.id;
        await this.props.getShowtimeById(id);
        this.setState({ showtime: this.props.showtime })
        let seatArr = this.createSeatArr();
        this.setState({ seatArr })
    }

    sendSeatData = async (data, indexC, indexR) => {
        // console.log(data, indexC, indexR);
        let seat = {};
        // set index element of seat in seatArr
        seat = { ...data, indexR, indexC };
        let a = [...this.state.seatedArr];
        let findingIndex = this.state.seatedArr.findIndex(seat => (seat.indexR === indexR && seat.indexC === indexC));
        if (findingIndex === -1) {
            //push into seat array.
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

    createSeatArr = () => {
        // let a = 1; let arr = []; let l = 160;
        // for (let i = 0; i < l; i++) {
        //     let seat = {
        //         name: `${a}`,
        //         index: null,
        //         status: false,
        //         vip: false,
        //     }
        //     arr.push(seat);
        //     a++;
        // }
        let r = 1; let c = 1; let arr = []; let row = 10; let col = 16;
        for (let i = 0; i < row; i++) {
            arr[i] = [];
            for (let j = 0; j < col; j++) {
                let seat = {
                    name: `${r}:${c}`,
                    index: null,
                    status: false,
                    vip: false,
                }
                c++; if (c === 17) { c = 1 }
                arr[i].push(seat);
            }
            r++;
        }
        // for (let index = 0; index < arr.length; index++) {
        //     let condi = (
        //         index === 34 || index === 35 || index === 36 || index === 37 || index === 38 || index === 39 || index === 40 || index === 41 || index === 42 || index === 43 || index === 44 || index === 45 ||
        //         index === 50 || index === 51 || index === 52 || index === 53 || index === 54 || index === 55 || index === 56 || index === 57 || index === 58 || index === 59 || index === 60 || index === 61 ||
        //         index === 66 || index === 67 || index === 68 || index === 69 || index === 70 || index === 71 || index === 72 || index === 73 || index === 74 || index === 75 || index === 76 || index === 77 ||
        //         index === 82 || index === 83 || index === 84 || index === 85 || index === 86 || index === 87 || index === 88 || index === 89 || index === 90 || index === 91 || index === 92 || index === 93 ||
        //         index === 98 || index === 99 || index === 100 || index === 101 || index === 102 || index === 103 || index === 104 || index === 105 || index === 106 || index === 107 || index === 108 || index === 109 ||
        //         index === 114 || index === 115 || index === 116 || index === 117 || index === 118 || index === 119 || index === 120 || index === 121 || index === 122 || index === 123 || index === 124 || index === 125
        //     );
        //     if (condi) { arr[index].vip = true; }
        // }
        for (let i = 0; i < arr.length; i++) {
            let arrOut = arr[i];
            for (let j = 0; j < arrOut.length; j++) {
                let codiC = (i === 2 || i === 3 || i === 4 || i === 5 || i === 6 || i === 7);
                let codeR = (j === 3 || j === 4 || j === 5 || j === 6 || j === 7 || j === 8 || j === 9 || j === 10 || j === 11 || j === 12);
                if (codiC && codeR) {
                    arrOut[j].vip = true;
                }
            }
        }
        return arr
    }

    renderSeat = () => {
        // return this.state.seatArr.map((item, index) => {
        //     if ((index + 1) % 16 === 0) {
        //         return (
        //             <Fragment key={index}>
        //                 <i className={`fa fa-minus-square ${item.status ? "seated" : ""}`} onClick={() => this.sendSeatData(item, index)}></i>
        //                 <br />
        //             </Fragment >
        //         )
        //     }
        //     return <i key={index} className={`fa fa-minus-square ${item.status ? "seated" : ""} ${item.vip ? "vip" : ""}`} onClick={() => this.sendSeatData(item, index)}></i>;
        // })
        return this.state.seatArr.map((item, iOutside) => {
            return (
                <Fragment key={iOutside}>
                    {item.map((item, iInside) => {
                        // return (
                        //     <Fragment key={index}>
                        //         <i className={`fa fa-minus-square ${item.status ? "seated" : ""}`} onClick={() => this.sendSeatData(item, index)}></i>
                        //     </Fragment >

                        // )
                        return <i key={iInside} className={`fa fa-minus-square ${item.status ? "seated" : ""} ${item.vip ? "vip" : ""}`}
                            onClick={() => this.sendSeatData(item, iOutside, iInside)}></i>;
                    })}
                    {/* <i className={`fa fa-minus-square ${item.status ? "seated" : ""}`} onClick={() => this.sendSeatData(item, index)}></i> */}
                    <br />
                    {/* {this.state.item.map((item, index) => {
                        return (
                            // <Fragment key={index}>
                            //     <i className={`fa fa-minus-square ${item.status ? "seated" : ""}`} onClick={() => this.sendSeatData(item, index)}></i>
                            // </Fragment >
                            <div>{item.}</div>
                        )
                    })} */}
                </Fragment >
            )
            // return <i key={index} className={`fa fa-minus-square ${item.status ? "seated" : ""} ${item.vip ? "vip" : ""}`} onClick={() => this.sendSeatData(item, index)}></i>;
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

    render() {
        console.log(this.state.seatArr);
        let theater = { ...this.state.showtime.theater }
        let movie = { ...this.state.showtime.movie }
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
                                            <span id="time">{this.countdownTimer(300)}</span>
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
                                <button>Thanh toán</button>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingTicket);


