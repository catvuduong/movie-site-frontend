import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import MovieModal from './../home/movie-modal';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: ""
        }
    }
    render() {
        const params = {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: true
            }
        }
        return (
            <section className="myCarousel">
                <Swiper {...params}>
                    <div className="carousel_item">
                        <img src="./images/tiec-trang-mau-blood-moon-party-16021267739246.png" alt="" />
                        <span className="fa fa-play"
                            onClick={() => { this.setState({ link: 'https://www.youtube.com/embed/nh0BklwPN9Q' }) }}
                            data-toggle="modal" data-target="#exampleModalCenter"></span>
                    </div>
                    <div className="carousel_item">
                        <img src="./images/underwater-15786235570575.jpg" alt="" />
                        <span className="fa fa-play"
                            onClick={() => { this.setState({ link: 'https://www.youtube.com/embed/jCFWEzIVILc' }) }}
                            data-toggle="modal" data-target="#exampleModalCenter"></span>
                    </div>
                    <div className="carousel_item">
                        <img src="./images/gia-dinh-chan-to-phieu-luu-ky-bigfoot-family-p-16061896575573.png" alt="" />
                        <span className="fa fa-play"
                            onClick={() => { this.setState({ link: 'https://youtube.com/embed/0qaStyeKpLo' }) }}
                            data-toggle="modal" data-target="#exampleModalCenter"></span>
                    </div>
                    <div className="carousel_item">
                        <img src="./images/mat-biec-15768091323740.jpg" alt="" />
                        <span className="fa fa-play"
                            onClick={() => { this.setState({ link: 'https://www.youtube.com/embed/ITlQ0oU7tDA' }) }}
                            data-toggle="modal" data-target="#exampleModalCenter"></span>
                    </div>
                    <div className="carousel_item">
                        <img src="./images/star-wars-15786236390718.jpg" alt="" />
                        <span className="fa fa-play"
                            onClick={() => { this.setState({ link: 'https://www.youtube.com/embed/olbgzq6qSdY' }) }}
                            data-toggle="modal" data-target="#exampleModalCenter"></span>
                    </div>
                </Swiper>
                <MovieModal link={this.state.link}></MovieModal>
            </section >
        )
    }
}


export default Carousel;
