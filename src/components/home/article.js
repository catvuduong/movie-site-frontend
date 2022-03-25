import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './../../redux/actions/index-action';
import News from './news-expansion';
import * as Actiontype from './../../redux/constants/action-type';
import { Element } from 'react-scroll';


class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filmOn: true,
            reviewOn: false,
            PromotionOn: false,
            listArticles: [],
            expandComponent: []
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
        let list = await this.props.listArticles;
        await this.props.sendSignExpand(list);
        this.setState({ expandComponent: await this.props.expandList });
    }

    componentWillUnmount() {
        this.props.removeSign();
    }


    render() {
        let film = this.state.filmOn ? "active" : "";
        let review = this.state.reviewOn ? "active" : "";
        let promo = this.state.PromotionOn ? "active" : "";
        return (
            < Element name='srollToArticle' className="myArticle container" >
                <div className="wig"></div>
                <div className="article_title container-fluid">
                    <button className={`article_film ${film}`} onClick={() => this.handleFilm()}>Điện Ảnh 24h</button>
                    <button className={`article_review ${review}`}
                        onClick={() => this.handleReview()}
                    >Review</button>
                    <button className={`article_promotion ${promo}`}
                        onClick={() => this.handlePromotion()}
                    >Khuyến Mãi</button>
                </div>
                <News listArticles={this.state.listArticles} />
                {this.state.expandComponent.map((aticles, index) => (
                    <News key={index} listArticles={aticles} />
                ))}
                <div className="article_expansion">
                    <button
                        onClick={() => this.expandNews()}
                    >XEM THÊM</button>
                </div>
            </Element >
        )
    }
}

const mapStateToProps = state => {
    return {
        listArticles: state.articleReducer.listArticles,
        dataTicket: state.bookingTicketReducer.dataTicket,
        expandList: state.articleReducer.expandList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getListArticles: async () => {
            await dispatch(action.actGetListArticlesAPI());
        },
        sendSignExpand: async list => {
            await dispatch({ type: Actiontype.SIGN_EXPAND, list });
        },
        removeSign: async () => {
            await dispatch({ type: Actiontype.DELETE_SIGN })
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Article);
