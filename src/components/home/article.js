import React, { Component } from 'react'

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filmOn: true,
            reviewOn: false,
            PromotionOn: false,
        }
    }

    handleFilm = () => {
        this.setState({
            filmOn: true,
            reviewOn: false,
            PromotionOn: false,
        });
    }

    handleReview = () => {
        this.setState({
            filmOn: false,
            reviewOn: true,
            PromotionOn: false,
        });
    }
    handlePromotion = () => {
        this.setState({
            filmOn: false,
            reviewOn: false,
            PromotionOn: true,
        });
    }


    render() {
        let film = this.state.filmOn ? "active" : "";
        let review = this.state.reviewOn ? "active" : "";
        let promo = this.state.PromotionOn ? "active" : "";
        return (
            < div className="myArticle" >
                <div className="article_title container-fluid">
                    <button className={`article_film ${film}`} onClick={() => this.handleFilm()}>Điện Ảnh 24h</button>
                    <button className={`article_review ${review}`}
                        onClick={() => this.handleReview()}
                    >Review</button>
                    <button className={`article_promotion ${promo}`}
                        onClick={() => this.handlePromotion()}
                    >Khuyến Mãi</button>
                </div>
                <div className="article_content">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">“Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates</div>
                            <div className="col-6">“Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates</div>
                        </div>
                        <div className="row">
                            <div className="col-4">“Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates</div>
                            <div className="col-4">“Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates</div>
                            <div className="col-4">“Lorem ipsum” dummy text is used by many web-developers to test how their HTML templates</div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
