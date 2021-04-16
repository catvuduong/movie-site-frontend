import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './../../redux/actions/index-action';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filmOn: true,
            reviewOn: false,
            PromotionOn: false,
        }
    }
    async componentDidMount() {
        await this.props.getListArticles();
        await this.props.listArticles
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

        let firstList = this.props.listArticles.slice(0, 2);
        let secondList = this.props.listArticles.slice(2, 4);
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
                        <div className="row first_list">
                            {
                                firstList.map((item, index) => (
                                    <div className="col-6 article_item" key={index}>
                                        <img src={"https://localhost:5001" + item.thumbnail} alt="" />
                                        <h5>{item.title}</h5>
                                        <p>{item.content}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="row second_list">
                            {
                                secondList.map((item, index) => (
                                    <div className="col-4 article_item" key={index}>
                                        <img src={"https://localhost:5001" + item.thumbnail} alt="" />
                                        <h5>{item.title}</h5>
                                        <p>{item.content}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


const mapStateToProps = state => {
    return {
        listArticles: state.articleReducer.listArticles,
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
