import React, { Component } from 'react'
import { connect } from "react-redux";
import * as action from "./../../redux/actions/index-action";
import { Link } from 'react-router-dom';

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
        }
    }

    async componentDidMount() {
        await this.props.getListBranches();
        await this.props.getListTheaters();
        this.setState({
            branches: this.props.listBranches,
            theaters: this.props.listBranches[0].theaters,
            movies: this.props.listBranches[0].theaters[0].showtimes.map(x => x.movie),
        });

        //turn on active at first branch and  first theater
        let btnsBranch = document.getElementsByClassName('cinema_btn');
        let btnsTheater = document.getElementsByClassName('theater_btn');
        btnsBranch[0].className += " btnsBranch_active";
        btnsTheater[0].className += " btnsTheater_active";



    }

    changeBranch(index = 0) {
        this.setState({
            theaters: this.props.listBranches[index].theaters,
            movies: this.props.listBranches[index].theaters[0].showtimes.map(x => x.movie),
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
        this.setState({
            movies: this.state.theaters[index].showtimes.map(x => x.movie),
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
        // let isActive = this.state.active ? "item_active" : "";
        return (
            <section className="myCinema container">
                <div className="row">
                    <div className="col-1 cinema_logo cinema_line">
                        {
                            this.state.branches.map((item, index) => (
                                // TODO: Add generic domain
                                <div className="item_line cinema_btn" key={index} onClick={() => this.changeBranch(index)}>
                                    <img src={"https://localhost:5001" + item.image} alt="" />
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-4 theater_logo cinema_line">
                        {
                            this.state.theaters.map((item, index) => (
                                <div className="item_line theater_btn" key={index} onClick={() => this.changeTheater(index)}>
                                    <div className="row theater_line" >
                                        <div className="col-2 theater_image">
                                            <img src={"https://localhost:5001" + item.image} alt="" />
                                        </div>
                                        <div className="col-10 theater_name">
                                            <div><span>{item.branch.name}</span> - <span>{item.name}</span></div>
                                            <div className="theater_address">{item.address}</div>
                                            <span className="theater_detail">[chi tiết]</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-7 movie_logo cinema_line">
                        {
                            this.state.movies.map((item, index) => (
                                <div className="item_line" key={index}>
                                    <Link to={`details-movie/${item.id}`}>
                                        <div className="row movie_line">
                                            <div className="col-1 movie_image">
                                                <img className="" src={item.thumbnail} alt="" />
                                            </div>
                                            <div className="col-11 movie_name">
                                                <p>{item.name}</p>
                                                <span>100 phút</span> - <span>Điểm: {item.rate}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
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
        listMovies: state.movieReducer.listMovies,
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
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Cinema);