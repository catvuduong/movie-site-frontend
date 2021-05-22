import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './../../redux/actions/index-action';
import News from './news-expansion';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filmOn: true,
            reviewOn: false,
            PromotionOn: false,
            listArticles: [],
        }
    }
    async componentDidMount() {
        await this.props.getListArticles();
        this.setState({ listArticles: this.props.listArticles });
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

    expandNews = async () => {
        await this.props.getListArticles();
        this.setState({ listArticles: this.props.listArticles });
    }


    render() {
        let film = this.state.filmOn ? "active" : "";
        let review = this.state.reviewOn ? "active" : "";
        let promo = this.state.PromotionOn ? "active" : "";
        return (
            < section className="myArticle container" id="article">
                <div className="article_title container-fluid">
                    <button className={`article_film ${film}`} onClick={() => this.handleFilm()}>Điện Ảnh 24h</button>
                    <button className={`article_review ${review}`}
                        onClick={() => this.handleReview()}
                    >Review</button>
                    <button className={`article_promotion ${promo}`}
                        onClick={() => this.handlePromotion()}
                    >Khuyến Mãi</button>
                </div>
                {this.state.listArticles.map((aticles, index) => (
                    <News key={index} listArticles={aticles} />
                ))}
                <div className="article_expansion">
                    <button
                        onClick={() => this.expandNews()}
                    >XEM THÊM</button>
                </div>
            </section >
        )
    }
}


const mapStateToProps = state => {
    return {
        listArticles: state.articleReducer.listArticles,
        dataTicket: state.bookingTicketReducer.dataTicket
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getListArticles: async () => {
            await dispatch(action.actGetListArticlesAPI());
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Article);
