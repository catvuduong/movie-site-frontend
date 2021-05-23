import React, { Component } from 'react';
import Carousel from './../../components/home/carousel';
import MovieModal from './../../components/home/movie-modal';
import ListMovie from './../../components/home/list-movie';
import Cinema from './../../components/home/cinema';
import Article from './../../components/home/article';
import Apps from './../../components/home/apps';

export default class Home extends Component {
    render() {
        return (
            <div>
                {/* <div className="" style={{ height: "120px" }}></div> */}
                <Carousel></Carousel>
                <ListMovie></ListMovie>
                {/* <Cinema></Cinema> */}
                <Article></Article>
                <Apps></Apps>
                <MovieModal></MovieModal>
                {/* <div className="" style={{ height: "120px" }}></div> */}
            </div>
        )
    }
}
