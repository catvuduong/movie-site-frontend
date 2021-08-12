import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './../../redux/actions/index-action';
import ArticleModal from './admin-modals/article-modal';

class ArticleManament extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
        await this.props.getListArticles();
    }

    handleRefesh = () => {
        setTimeout(() => {
            this.props.getListArticles();
        }, 500);
    }

    render() {
        let orderNumber = 1;
        let { listArticles } = this.props
        return (
            <div className="myMovieManament text-center">
                <button className="btn btn-primary add_branch" data-toggle="modal"
                    data-target="#articleInfoModal"
                    onClick={() => {
                        this.setState({ objectEdit: null, type: null });
                    }}
                >Add Article</button>
                <h3 className="my-3">LIST OF ARTICLES</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listArticles.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{orderNumber++}</th>
                                    <td>{item.title}</td>
                                    <td>{item.content}</td>
                                    <td>{item.thumbnail}</td>

                                    <td>
                                        <button className="btn btn-success btn--edit" data-toggle="modal"
                                            data-target="#articleInfoModal" onClick={() => {
                                                this.setState({ objectEdit: item, type: "edit" })
                                            }}>Edit</button>
                                        <button className="btn btn-danger btn--delete" data-toggle="modal"
                                            data-target="#submitDeleteArticleModal" onClick={() => {
                                                this.setState({ objectEdit: item, type: "delete" })
                                            }}>Delete</button>
                                    </td>
                                </tr >
                            );
                        })}
                    </tbody>
                </table>
                <ArticleModal objectEdit={this.state.objectEdit} type={this.state.type} refesh={this.handleRefesh}></ArticleModal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getListArticles: async () => {
            await dispatch(action.actGetListArticlesAPI())
        },
    }
}

const mapStateToProps = state => {
    return {
        listArticles: state.articleReducer.listArticles,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleManament);


