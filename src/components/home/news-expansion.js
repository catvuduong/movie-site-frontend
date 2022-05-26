import React, { Component } from 'react'

export default class NewsExpansion extends Component {

    render() {
        let firstList = this.props.listArticles.slice(0, 2);
        let secondList = this.props.listArticles.slice(2, 4);
        let thirdList = this.props.listArticles.slice(4);
        return (
            <div className="article_content">
                <div className="container">
                    <div className="row first_list">
                        {firstList.map((item, index) => (
                            <div className="col-6 article_item" key={index}>
                                <img src={item.thumbnail} alt="" />
                                <h5>{item.title}</h5>
                                <p>{item.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className="row second_list">
                        {secondList.map((item, index) => (
                            <div className="col-4 article_item" key={index}>
                                <img src={item.thumbnail} alt="" />
                                <h5>{item.title}</h5>
                                <p>{item.content}</p>
                            </div>
                        ))}
                        <div className="col-4 article_item thirdList">
                            {thirdList.map((item, index) => (
                                <div className="thirdList_item" key={index}>
                                    <img src={item.thumbnail} alt="" />
                                    <h5>{item.title}</h5>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
