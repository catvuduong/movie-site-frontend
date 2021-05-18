import React, { Component } from 'react'
import { connect } from "react-redux";
import * as action from "./../../redux/actions/index-action";
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as ActionType from './../../redux/constants/action-type';

class Cinema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            branches: [
                {
                    name: "",
                    image: "",
                    id: ""
                }
            ],
            theaters: [],
            movies: [],
            dataTicket: {},
        }
    }

    async componentDidMount() {
        await this.props.getListBranches();
        await this.props.getListTheaters();

        let firstTheater = this.props.listBranches[0].theaters[0];
        let orderedMovies = this.orderedMovies(firstTheater);

        this.setState({
            branches: this.props.listBranches,
            theaters: this.props.listBranches[0].theaters,
            movies: orderedMovies,
        });

        //turn on active at first branch and  first theater
        let btnsBranch = document.getElementsByClassName('cinema_btn');
        let btnsTheater = document.getElementsByClassName('theater_btn');
        if (btnsBranch[0] && btnsTheater[0]) {
            btnsBranch[0].className += " btnsBranch_active";
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
        let theater = this.props.listBranches[index].theaters[0];
        let orderedMovies = this.orderedMovies(theater);
        this.setState({
            theaters: this.props.listBranches[index].theaters,
            movies: orderedMovies,
        });
        let btnsBranch = document.getElementsByClassName('cinema_btn');
        for (let i = 0; i < btnsBranch.length; i++) {
            let current = document.getElementsByClassName('btnsBranch_active');
            if (current.length > 0) {
                current[0].className = current[0].className.replace(' btnsBranch_active', '');
            }
            btnsBranch[index].className += ' btnsBranch_active';
        }
    }

    changeTheater(index = 0) {
        let theater = this.props.listTheaters[index];
        let orderedMovies = this.orderedMovies(theater);
        this.setState({
            movies: orderedMovies,
        });
        let btnsTheater = document.getElementsByClassName('theater_btn');
        for (let i = 0; i < btnsTheater.length; i++) {
            let current = document.getElementsByClassName('btnsTheater_active');
            if (current.length > 0) {
                current[0].className = current[0].className.replace(' btnsTheater_active', '');
            }
            btnsTheater[index].className += ' btnsTheater_active';
        }
    }

    render() {
        return (
            <section className="myCinema container">
                <div className="row">
                    <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-2 cinema_logo cinema_line">
                        {
                            this.state.branches.map((item, index) => (
                                // TODO: Add generic domain
                                <div className="item_line cinema_btn" key={index} onClick={() => this.changeBranch(index)}>
                                    <img src={"https://localhost:5001" + item.image} alt="" />
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-5 col-sm-5 col-5 theater_logo cinema_line">
                        {
                            this.state.theaters.map((item, index) => (
                                <div className="item_line theater_btn" key={index} onClick={() => this.changeTheater(index)}>
                                    <div className="row theater_line" >
                                        <div className="col-2 theater_image">
                                            <img src={"https://localhost:5001" + item.image} alt="" />
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
                            this.state.movies
                                ? this.state.movies.map((item, index) => (
                                    <div className="item_line" key={index}>
                                        <Link to={`details-movie/${item.id}`}>
                                            <div className="row movie_line">
                                                <div className="col-1 movie_image">
                                                    <img className="" src={item.data[0].movie.thumbnail} alt="" />
                                                </div>
                                                <div className="col-11 movie_name">
                                                    <p>{item.data[0].movie.name}</p>
                                                    <span>100 phút - Điểm: {item.data[0].movie.rate} </span>
                                                </div>
                                            </div>
                                        </Link>
                                        <div>
                                            {
                                                item.data.map((showtime, index) => (
                                                    <Link
                                                        to={`booking-ticket/${showtime.id}`}
                                                        key={index} type="button" className="btn btn-outline-secondary">{moment(showtime.time).format("HH:mm")}</Link>
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

const mapStateToProps = (state) => {
    return {
        listBranches: state.branchReducer.listBranches,
        listTheaters: state.theaterReducer.listTheaters,
        listArticles: state.articleReducer.listArticles,
        dataTicket: state.bookingTicketReducer.dataTicket
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListBranches: async () => {
            await dispatch(action.actGetListBranchesAPI());
        },
        getListTheaters: async () => {
            await dispatch(action.actGetListTheatersAPI());
        },
        dispatchDataTicket: async dataTicket => {
            await dispatch({
                type: ActionType.GET_DATA_TICKET,
                dataTicket
            });
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Cinema);