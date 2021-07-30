import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as ActionType from './../../redux/constants/action-type';

class Cinema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listBranches: [],
            listTheaters: [],
            listMovies: [],
            dataTicket: {},
        }
    }

    async componentDidMount() {
        let firstTheater = this.props.listBranches[0].theaters[0];
        let orderedMovies = this.orderedMovies(firstTheater);
        if (this.props.listBranches) {
            await this.setState({
                listBranches: this.props.listBranches,
                listTheaters: this.props.listBranches[0].theaters,
                listMovies: orderedMovies,
            });
        }
        //turn on active at first branch and  first theater
        let btnsBranch = document.getElementsByClassName('cinema_btn');
        let btnsTheater = document.getElementsByClassName('theater_btn');
        if (btnsBranch[0] && btnsTheater[0]) {
            btnsBranch[0].className += ' btnsBranch_active';
            btnsTheater[0].className += " btnsTheater_active";
        }
    }

    orderedMovies = array => {
        let orderedMovies = [];
        if (array) { // Check if first theater is existed
            let moviesObj = {};
            for (const showtime of array.showtimes) {
                moviesObj[showtime.movieId] = [];
            }
            for (const showtime of array.showtimes) {
                moviesObj[showtime.movieId].push(showtime);
            }
            for (const movieId in moviesObj) {
                orderedMovies.push({
                    id: movieId,
                    data: moviesObj[movieId]
                })
            }
        }
        return orderedMovies
    }

    changeBranch(index = 0) {
        let theater = this.state.listBranches[index].theaters[0];
        let orderedMovies = this.orderedMovies(theater);
        this.setState({
            listTheaters: this.state.listBranches[index].theaters,
            listMovies: orderedMovies,
        });
        //active choosen branch
        let btnsBranch = document.getElementsByClassName('cinema_btn');
        for (let i = 0; i < btnsBranch.length; i++) {
            let current = document.getElementsByClassName('btnsBranch_active');
            if (current.length > 0) {
                current[0].className = current[0].className.replace('btnsBranch_active', '');
            }
            btnsBranch[index].className += ' btnsBranch_active';
        }
        // active first theater of list branches
        let btnsTheater = document.getElementsByClassName('theater_btn');
        for (let i = 0; i < btnsTheater.length; i++) {
            let current = document.getElementsByClassName('btnsTheater_active');
            if (current.length > 0) {
                current[0].className = current[0].className.replace('btnsTheater_active', '');
            }
            btnsTheater[0].className += ' btnsTheater_active';
        }
    }

    changeTheater(index = 0) {
        let theater = this.state.listTheaters[index];
        let orderedMovies = this.orderedMovies(theater);
        this.setState({
            listMovies: orderedMovies,
        });
        let btnsTheater = document.getElementsByClassName('theater_btn');
        for (let i = 0; i < btnsTheater.length; i++) {
            let current = document.getElementsByClassName('btnsTheater_active');
            if (current.length > 0) {
                current[0].className = current[0].className.replace('btnsTheater_active', '');
            }
            btnsTheater[index].className += ' btnsTheater_active';
        }
    }

    render() {
        return (
            <section className="myCinema container" id="cinema">
                <div className="wig"></div>
                <div className="row">
                    <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-2 cinema_logo cinema_line">
                        {
                            this.state.listBranches.map((item, index) => (
                                // TODO: Add generic domain
                                <div className="item_line cinema_btn" key={index} onClick={() => this.changeBranch(index)}>
                                    <img src={"" + item.image} alt="" />
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-5 col-sm-5 col-5 theater_logo cinema_line">
                        {
                            this.state.listTheaters.map((item, index) => (
                                <div className="item_line theater_btn" key={index} onClick={() => this.changeTheater(index)}>
                                    <div className="row theater_line" >
                                        <div className="col-2 theater_image">
                                            <img src={"" + item.image} alt="" />
                                        </div>
                                        <div className="col-10 theater_name">
                                            <div><span>{item.branch.name} - </span><span>{item.name}</span></div>
                                            <div className="theater_address">{item.address}</div>
                                            <span className="theater_detail">[chi tiết]</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-xl-7 col-lg-7 col-md-5 col-sm-5 col-5 movie_logo cinema_line">
                        {
                            this.state.listMovies
                                ? this.state.listMovies.map((item, index) => (
                                    <div className="item_line" key={index}>
                                        <div className="row movie_line">
                                            <div className="col-1 movie_image">
                                                <Link to={`details-movie/${item.id}`}>
                                                    <img className="" src={item.data[0].movie.thumbnail} alt="" />
                                                </Link>
                                            </div>
                                            <div className="col-11 movie_name">
                                                <Link to={`details-movie/${item.id}`}>
                                                    <p>{item.data[0].movie.name}</p></Link>
                                                <span>100 phút - Điểm: {item.data[0].movie.rate} </span>
                                            </div>
                                        </div>
                                        <div className="movie_showtimes">
                                            {
                                                item.data.map((showtime, index) => (
                                                    <Link
                                                        to={`booking-ticket/${showtime.id}`}
                                                        key={index} type="button" className="btn btn-outline-secondary">
                                                        {moment(showtime.time).format("HH:mm")}</Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                                : null
                        }
                    </div>
                </div>
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchDataTicket: async dataTicket => {
            await dispatch({
                type: ActionType.GET_DATA_TICKET,
                dataTicket
            });
        }
    };
};


export default connect(null, mapDispatchToProps)(Cinema);