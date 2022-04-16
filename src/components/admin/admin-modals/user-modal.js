import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import { Modal, Button } from 'react-bootstrap';

class UserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                username: "",
                email: "",
                password: ""
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

    handleShow = () => {
        this.setState({ actionModal: true })
    }

    handleClose = () => {
        this.setState({ actionModal: false })
    }

    handleSubmit = async e => {
        e.preventDefault();
        await this.props.actionUser(this.state.object, this.props.type);
        await this.handleClose();
        await this.props.refesh();
    }

    render() {
        return (
            <>
                <Modal
                    className="modal fade userModal"
                    show={this.state.actionModal}
                    onHide={() => this.handleClose()}
                >
                    <Modal.Header className='warning-header userModal-header'>
                        <span className='warning-sign userModal-sign'
                            onClick={() => this.handleClose()}
                        > x</span>
                        <h5 className="modal-title">{this.props.objectEdit ? "EDIT USER" : "ADD USER"}</h5>
                    </Modal.Header>
                    <Modal.Body className='warning-body'>
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
            </ >
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