import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import { Modal, Button } from 'react-bootstrap';

class BranchModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                name: "",
                image: ""
            },
            actionModal: false
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
                }
            });
        }
        else {
            this.setState({
                object: {
                    name: "",
                    image: "",
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
        await this.props.actionBranch(this.state.object, this.props.type);
        await this.handleClose();
        await this.props.refesh();
    }

    render() {
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
                        </div>
                        <div className='text-right'>
                            <Button type="submit" className="btn btn-success text-right"
                                onClick={() => this.handleSubmit}
                            >
                                {this.props.objectEdit ? "Update" : "Submit"}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actionBranch: (ojbect, type) => {
            dispatch(action.actBranchManagement(ojbect, type));
        }
    }
}

export default connect(null, mapDispatchToProps)(BranchModal);