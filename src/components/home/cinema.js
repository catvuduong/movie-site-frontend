import React, { Component } from 'react'
import { connect } from "react-redux";
import * as action from "./../../redux/actions/index-action";


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
            movies: []
        }
    }

    async componentDidMount() {
        await this.props.getListBranches();
        await this.props.getListTheaters();
        await this.props.getListMovies();
        this.setState({
            branches: this.props.listBranches,
            theaters: this.props.listTheaters,
            movies: this.props.listMovies,
        });
    }

    render() {
        return (
            <section className="myCinema container">
                <div className="row">
                    <div className="col-1 cinema_logo cinema_line">
                        {
                            this.state.branches.map((item, index) => (
                                // TODO: Add generic domain
                                <div className="item_line" key={index}>
                                    <img className="" src={"https://localhost:5001" + item.image} alt="" />
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-4 theater_logo cinema_line">
                        {
                            this.state.theaters.map((item, index) => (
                                <div className="item_line">
                                    <div className="row theater_line" key={index}>
                                        <div className="col-2 theater_image">
                                            <img className="" src={"https://localhost:5001" + item.image} alt="" />
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
                                <div className="item_line">
                                    <div className="row movie_line" key={index}>
                                        <div className="col-1 movie_image">
                                            <img className="" src={item.thumbnail} alt="" />
                                        </div>
                                        <div className="col-11 movie_name">
                                            <div>{item.name}</div>
                                            <span>100 phút</span> - <span>Điểm: {item.rate}</span>
                                        </div>
                                    </div>
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
        getListMovies: async () => {
            await dispatch(action.actGetListMoviesAPI());
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Cinema);