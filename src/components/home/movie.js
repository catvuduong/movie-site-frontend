import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Movie extends Component {

    render() {
        let { movie } = this.props;
        return (
            <div className="card_movie">
                <NavLink to={`detail-movie/${movie.id}`} className="card">
                    <img src={movie.thumbnail} alt="" className="movie_image" />
                    <div className="card-body">
                        <div className="movie_name">{movie.name}</div>
                        <button className="btn btn--movie">MUA VÉ</button>
                    </div>
                </NavLink>
            </div>
        )
    }
}

