import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "./../../redux/actions/index-action";
import Movie from "./movie";
import Slider from "react-slick";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style, display: "block", background: ""
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "" }}
            onClick={onClick}
        />
    );
}

class ListMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [
                {
                    name: "",
                    alias: null,
                    trailer: "",
                    thumbnail: "",
                    description: "",
                    status: "",
                    rate: null,
                    showtimes: null,
                    id: ""
                }
            ],
            filmingClicked: true,
            goingFilmClicked: false,
        }
    }
    async componentDidMount() {
        await this.props.getListMovies();
        this.setState({
            movies: this.props.listMovies
        });
    }

    handleFilming = () => {
        this.setState({
            movies: this.props.listMovies,
            filmingClicked: true,
            goingFilmClicked: false,
        });
    }

    handleGoingFilm = () => {
        let listMovies = (this.props.listMovies).slice(4);
        this.setState({
            movies: listMovies,
            filmingClicked: false,
            goingFilmClicked: true,
        });
    }

    renderHTML = (array) => {
        return array.map((item, index) => {
            return (
                <div key={index} >
                    <Movie movie={item}></Movie>
                </div>
            );
        });
    };

    render() {
        const settings = {
            infinite: true,
            speed: 500,
            rows: 2,
            slidesToShow: 1,
            slidesToScroll: 1,
            slidesPerRow: 4,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesPerRow: 3,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        rows: 1,
                        slidesPerRow: 2,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        rows: 1,
                        slidesPerRow: 1,
                    }
                },
            ],
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        };

        let filmingClass = this.state.filmingClicked ? "active" : "";
        let goingFilmClass = this.state.goingFilmClicked ? "active" : "";
        return (
            <section className="myListMovie" id="listMovie">
                <div className="list_content">
                    <div className="container-fluid">
                        <div className="list_tittle">
                            <button className={`filming ${filmingClass}`} onClick={() => this.handleFilming()}>Đang Chiếu</button>
                            <button className={`goingto_film ${goingFilmClass}`}
                                onClick={() => this.handleGoingFilm()}
                            >Sắp Chiếu</button>
                        </div >
                    </div>
                    <div className="list_movie">
                        <Slider {...settings}>
                            {this.renderHTML(this.state.movies)}
                        </Slider>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listMovies: state.movieReducer.listMovies,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListMovies: async () => {
            await dispatch(action.actGetListMoviesAPI());
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ListMovie);
