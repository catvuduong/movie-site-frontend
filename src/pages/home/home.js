import React, { Component } from 'react';
import Header from './../../components/home/header';
import Carousel from './../../components/home/carousel';
import MovieModal from './../../components/home/movie-modal';
import ListMovie from './../../components/home/list-movie';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <Carousel></Carousel>
                <MovieModal></MovieModal>
                <ListMovie></ListMovie>
            </div>
        )
    }
}
