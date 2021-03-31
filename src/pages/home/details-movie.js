import React, { Component, Fragment } from 'react';
import * as  action from './../../redux/actions/index-action';
import { connect } from 'react-redux';
import Showtimes from './../../components/details-movie/showtimes-movie';

class DetailsMovie extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getDetailsMovie(id);
    }
    render() {
        let { movie } = this.props
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
                <Showtimes></Showtimes>
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
