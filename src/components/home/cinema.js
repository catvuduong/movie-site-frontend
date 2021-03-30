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
        await this.props.getListBranch();
        await this.props.getListTheater();
        await this.props.getListMovie();
        this.setState({
            branches: this.props.listBranches,
            theaters: this.props.listTheaters,
            movies: this.props.listMovie,
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
                    <div className="col-4 cinema_logo cinema_line">
                    {
                        this.state.theaters.map((item, index) => (
                            <div className="row" key={index}>
                                <div className="col-4 theater_line">
                                    <img className="" src={"https://localhost:5001" + item.image} alt="" />
                                </div>
                                <div className="col-8">
                                    <div><span>{item.branch.name}</span> - {item.name}</div>
                                    <div>{item.address}</div>
                                    <a href="#">[chi tiết]</a>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                    <div className="col-7 cinema_line">
                    {
                        this.state.movies.map((item, index) => (
                            <div className="row" key={index}>
                                <div className="col-4 theater_line">
                                    <img className="" src={item.thumbnail} alt="" />
                                </div>
                                <div className="col-8">
                                    <div>{item.name}</div>
                                    <div>100 phút</div>
                                    <div>Rate: {item.rate}</div>
                                    <a href="#">[chi tiết]</a>
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
        listMovie: state.movieReducer.listMovie,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListBranch: async () => {
            await dispatch(action.actGetListBranchesAPI());
        },
        getListTheater: async () => {
            await dispatch(action.actGetListTheatersAPI());
        },
        getListMovie: async () => {
            await dispatch(action.actGetListMovieAPI());
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Cinema);