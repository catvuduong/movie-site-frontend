import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import $ from 'jquery';

class UserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                username: "",
                email: "",
                password: ""
            },
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.objectEdit) {
            // console.log(nextProps.objectEdit);
            this.setState({
                object: {
                    id: nextProps.objectEdit.id,
                    username: nextProps.objectEdit.username,
                    email: nextProps.objectEdit.email,
                }
            });
        }
        else {
            this.setState({
                object: {
                    username: "",
                    email: "",
                    password: ""
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
        this.props.actionUser(this.state.object, this.props.type);
        this.props.refesh();
        $('#userInfoModal').modal('hide');
    }

    handleDelete = () => {
        this.props.actionUser(this.state.object, this.props.type)
        this.props.refesh();
        $('#submitDeleteUserModal').modal('hide');
    }
    render() {
        return (
            <div>
                <div
                    className="modal fade"
                    id="userInfoModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="modelTitleId"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content text-right">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.objectEdit ? "EDIT USER" : "ADD USER"}</h5>
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
                                            <input type="text" className="form-control" onChange={this.handleOnChange} name="username" value={this.state.object.username} />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control" onChange={this.handleOnChange} name="email" value={this.state.object.email} />
                                        </div>
                                        {this.props.objectEdit ? null :
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password" className="form-control" onChange={this.handleOnChange} name="password" value={this.state.object.password} />
                                            </div>
                                        }
                                    </div>
                                    <button type="submit" className="btn btn-success">
                                        {this.props.objectEdit ? "Update" : "Submit"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="submitDeleteUserModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        actionUser: async (object, type) => {
            await dispatch(action.actUserManagement(object, type));
        }
    }
}

export default connect(null, mapDispatchToProps)(UserModal);