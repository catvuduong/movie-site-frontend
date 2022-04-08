import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import $ from 'jquery';

class ModalTheater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                name: "",
                image: "",
                branchId: "",
            },
            classModal: false,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.objectEdit) {
            this.setState({
                object: {
                    id: nextProps.objectEdit.id,
                    name: nextProps.objectEdit.name,
                    image: nextProps.objectEdit.image,
                    branchId: nextProps.objectEdit.branchId,
                }
            });
        }
        else {
            this.setState({
                object: {
                    name: "",
                    image: "",
                    branchId: "",
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
        this.props.actionSubmit(this.state.object, this.props.type);
        // this.props.getListTheaters();
        this.props.refesh();
        setTimeout(
            this.setState({
                object: {
                    name: "",
                    image: "",
                    branchId: "",
                }
            }), 500
        );

        // HANDLE CLOSE MODAL
        // TODO: replace with react modal
        $('#theaterInfoModal').modal('hide');

    }

    handleDelete = () => {
        this.props.actionSubmit(this.state.object, this.props.type)
        this.props.refesh();
    }


    handleBranchID = list => {
        // Id of list branches is branchId
        return list.map((item, index) => {
            return (
                <option key={index} value={item.id} >
                    {item.name}
                </option>
            );
        })
    }

    render() {
        let { listBranches, objectEdit } = this.props;
        return (
            <div>
                <div
                    className="modal fade"
                    id="theaterInfoModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="modelTitleId"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content text-right">
                            <div className="modal-header">
                                <h5 className="modal-title">{objectEdit ? "EDIT THEATER" : "ADD THEATER"}</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span
                                        aria-hidden="true"
                                    >×</span>
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
                                            <input type="text" className="form-control" onChange={this.handleOnChange} name="image" value={this.state.object.image} />
                                        </div>
                                        {this.props.objectEdit ? null :
                                            <div className="form-group">
                                                <label>Branch</label>
                                                <select className="form-control" onChange={this.handleOnChange} name="branchId" value={this.state.object.branchId} >
                                                    <option value="" disabled hidden>Chose branch</option>
                                                    {this.handleBranchID(listBranches)}
                                                </select>
                                            </div>
                                        }
                                    </div>
                                    <button type="submit" className="btn btn-success">
                                        {objectEdit ? "Update" : "Submit"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="submitDeleteTheaterModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure to delete theater?
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
        actionSubmit: async (object, type) => {
            await dispatch(action.actTheaterManagement(object, type));
        },
        getListTheaters: async () => {
            await dispatch(action.actGetListTheatersAPI())
        },
    }
}

const mapStateToProps = state => {
    return {
        listBranches: state.branchReducer.listBranches,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalTheater);