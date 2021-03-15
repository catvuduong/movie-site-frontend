import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/index-action';

class ModalBranch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            branch: {
                name: "",
                image: ""
            },
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.branchEdit) {
            this.setState({
                branch: {
                    id: nextProps.branchEdit.id,
                    name: nextProps.branchEdit.name,
                    image: nextProps.branchEdit.image,
                }
            });
        }
        else {
            this.setState({
                branch: {
                    name: "",
                    image: "",
                }
            })
        }
    }


    handleOnChange = event => {
        let { name, value } = event.target;
        this.setState({
            branch: {
                ...this.state.branch, [name]: value
            }
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.actionBranch(this.state.branch, this.props.type);
    }

    handleDelete = () => {
        this.props.actionBranch(this.state.branch, this.props.type)
    }
    render() {
        return (
            <div>
                <div
                    className="modal fade"
                    id="branchInfoModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="modelTitleId"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content text-right">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.branchEdit ? "EDIT BRANCH" : "ADD BRANCH"}</h5>
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
                                            <input type="text" className="form-control" onChange={this.handleOnChange} name="name" value={this.state.branch.name} />
                                        </div>
                                        <div className="form-group">
                                            <label>Image</label>
                                            <input type="text" className="form-control" onChange={this.handleOnChange} name="image" value={this.state.branch.image} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success">
                                        {this.props.branchEdit ? "Update" : "Submit"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="submitDeleteModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure to delete branch?
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
        actionBranch: (branch, type) => {
            dispatch(action.actBranchManagement(branch, type));
        }
    }
}

export default connect(null, mapDispatchToProps)(ModalBranch);