import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import $ from 'jquery';

class MovieModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                name: "",
                thumbnail: ""
            },
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.objectEdit) {
            // console.log(nextProps.objectEdit);
            this.setState({
                object: {
                    id: nextProps.objectEdit.id,
                    name: nextProps.objectEdit.name,
                    thumbnail: nextProps.objectEdit.thumbnail,
                }
            });
        }
        else {
            this.setState({
                object: {
                    name: "",
                    thumbnail: "",
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
        this.props.actionMovie(this.state.object, this.props.type);
        this.props.refesh();
        $('#movieInfoModal').modal('hide');
    }

    handleDelete = () => {
        this.props.actionMovie(this.state.object, this.props.type)
        this.props.refesh();
        $('#submitDeleteMovieModal').modal('hide');
    }
    render() {
        return (
            <div>
                <div
                    className="modal fade"
                    id="movieInfoModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="modelTitleId"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content text-right">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.objectEdit ? "EDIT MOVIE" : "ADD MOVIE"}</h5>
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
                                            <label>Name</label>
                                            <input type="text" className="form-control" onChange={this.handleOnChange} name="name" value={this.state.object.name} />
                                        </div>
                                        <div className="form-group">
                                            <label>Image</label>
                                            <input type="text" className="form-control" onChange={this.handleOnChange} name="thumbnail" value={this.state.object.thumbnail} />
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
                <div className="modal fade" id="submitDeleteMovieModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure to delete movie?
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
        actionMovie: async (ojbect, type) => {
            await dispatch(action.actMovieManagement(ojbect, type));
        }
    }
}

export default connect(null, mapDispatchToProps)(MovieModal);