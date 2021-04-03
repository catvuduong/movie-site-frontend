import React, { Component, Fragment } from 'react';
import * as  action from './../../redux/actions/index-action';
import { connect } from 'react-redux';
import Description from './../../components/details-movie/description';
import ShowtimesDetail from './../../components/details-movie/showtimes-detailsmoive';


class DetailsMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedShowtimes: true,
            clickedDescription: false,
            component: ShowtimesDetail,
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getDetailsMovie(id);
    }

    handleShowtimes = () => {
        this.setState({
            clickedShowtimes: true,
            clickedDescription: false,
            component: ShowtimesDetail,
        })
    }
    handleDescription = () => {
        this.setState({
            clickedDescription: true,
            clickedShowtimes: false,
            component: Description
        })
    }
    renderDisplay = Component => (<Component movie={this.props.movie}></Component>);

    render() {
        let { movie } = this.props
        let showtimes = this.state.clickedShowtimes ? "active" : "";
        let descript = this.state.clickedDescription ? "active" : "";
        return (
            <Fragment>
                <div className="myDetailsMovie">
                    <div className="backgroud_cover" style={{
                        backgroundImage: `url(${movie.thumbnail})`
                    }} ></div>
                    <div className="cover_second"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-3 movie_image">
                                <img src={movie.thumbnail} />
                            </div>
                            <div className="col-3 movie_name">
                                <p>{movie.name}</p>
                                <button className="btn btn-danger">Mua vé</button>
                            </div>
                            <div className="col-6 movie_rate">
                                <span>{movie.rate}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="myShowtimes">
                    <div className="showtimes_title">
                        <button className={`showtime_btns ${showtimes}`} onClick={() => this.handleShowtimes()}>Lịch Chiếu</button>
                        <button className={`showtime_btns ${descript}`} onClick={() => this.handleDescription()}>Thông Tin</button>
                    </div>
                    <div className="showtimes_content">{this.renderDisplay(this.state.component)}</div>
                </div >
            </Fragment>
        )
    }
}

const mapDispatchTopProps = dispatch => {
    return {
        getDetailsMovie: async id => {
            await dispatch(action.actGetDetailsMovie(id))
        }
    }
}
const mapStateToProps = state => {
    return {
        movie: state.movieReducer.movie
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(DetailsMovie);
