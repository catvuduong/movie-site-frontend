import React, { Component } from 'react';

export default class Movie extends Component {
    render() {
        let { movie } = this.props;
        return (
            <div className="card_movie">
                <div className="card">
                    <img src={movie.thumbnail} alt="" className="movie_image" />
                    <div className="card-body">
                        <div className="movie_name">{movie.name}</div>
                        <div className="movie_layout"></div>
                        <button className="fa fa-play movie_play"></button>
                        <button className="btn btn--movie">MUA VÉ</button>
                    </div>
                </div>
            </div>
        )
    }
}

