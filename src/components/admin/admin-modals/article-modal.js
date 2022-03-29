import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import $ from 'jquery';

class ArticleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                title: "",
                thumbnail: "",
                content: ""
            },
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.objectEdit) {
            // console.log(nextProps.objectEdit);
            this.setState({
                object: {
                    id: nextProps.objectEdit.id,
                    title: nextProps.objectEdit.title,
                    thumbnail: nextProps.objectEdit.thumbnail,
                    content: nextProps.objectEdit.content
                }
            });
        }
        else {
            this.setState({
                object: {
                    title: "",
                    thumbnail: "",
                    content: ""
                }
            })
        }
    }

    handleOnChange = event => {
        let { name, value } = event.target;
        this.setState({
            object: {
                ...this.state.object, [name]: value
            }
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.actionArticle(this.state.object, this.props.type);
        this.props.refesh();
        $('#articleInfoModal').modal('hide');
    }

    handleDelete = () => {
        this.props.actionArticle(this.state.object, this.props.type)
        this.props.refesh();
        $('#submitDeleteArticleModal').modal('hide');
    }

    handleOjectID = list => {
        return list.map((item, index) => {
            return (
                <option key={index} value={item.id} >
                    {item.name}
                </option>
            );
        })
    }

    render() {
        return (
            <div>
                <div
                    className="modal fade"
                    id="articleInfoModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="modelTitleId"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content text-right">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.objectEdit ? "EDIT ARTICLE" : "ADD ARTICLE"}</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="text-left">
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input type="text" className="form-control" onChange={this.handleOnChange} name="title" value={this.state.object.title} />
                                        </div>
                                        <div className="form-group">
                                            <label>Thumbnail</label>
                                            <input type="text" className="form-control" onChange={this.handleOnChange} name="thumbnail" value={this.state.object.thumbnail} />
                                        </div>
                                        <div className="form-group">
                                            <label>Content</label>
                                            <input type="text" className="form-control" onChange={this.handleOnChange} name="content" value={this.state.object.content} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success">
                                        {this.props.objectEdit ? "Update" : "Submit"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="submitDeleteArticleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure to delete?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.handleDelete()}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actionArticle: async (ojbect, type) => {
            await dispatch(action.actArticleManagement(ojbect, type));
        }
    }
}

export default connect(null, mapDispatchToProps)(ArticleModal);