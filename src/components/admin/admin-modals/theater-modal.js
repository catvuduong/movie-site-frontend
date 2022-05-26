import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import { Modal, Button } from 'react-bootstrap';

class TheaterModal extends Component {
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

    componentDidMount() {
        const { actionRef } = this.props;
        actionRef(this);
    }

    componentWillUnmount() {
        const { actionRef } = this.props;
        actionRef(undefined);
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

    handleShow = () => {
        this.setState({ actionModal: true })
    }

    handleClose = () => {
        this.setState({ actionModal: false })
    }

    handleSubmit = async e => {
        e.preventDefault();
        await this.props.actionSubmit(this.state.object, this.props.type);
        await this.handleClose();
        await this.props.refesh();
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
        let { listBranches } = this.props;
        return (
            <Modal
                className="modal fade"
                show={this.state.actionModal}
                onHide={() => this.handleClose()}
            >
                <Modal.Header className='warning-header userModal-header'>
                    <span className='warning-sign userModal-sign'
                        onClick={() => this.handleClose()}
                    > x</span>
                    <h5 className="modal-title">{this.props.objectEdit ? "EDIT BRANCH" : "ADD BRANCH"}</h5>
                </Modal.Header>
                <Modal.Body className='warning-body'>
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
                        <Button type="submit" className="btn btn-success text-right"
                            onClick={() => this.handleSubmit}
                        >
                            {this.props.objectEdit ? "Update" : "Submit"}
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(TheaterModal);