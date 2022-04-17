import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import { Modal, Button } from 'react-bootstrap';

class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                username: "",
                email: "",
                password: ""
            },
            deleteModal: false
        }
    }

    componentDidMount() {
        const { deleteRef } = this.props;
        deleteRef(this);
    }
    componentWillUnmount() {
        const { deleteRef } = this.props;
        deleteRef(undefined);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.objectEdit) {
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

    handleShow = () => {
        this.setState({ deleteModal: true })
    }

    handleClose = () => {
        this.setState({ deleteModal: false })
    }

    handleSubmit = async () => {
        switch (this.props.type) {
            case "branch_delete":
                await this.props.actionBranch(this.state.object, this.props.type);
                break;
            case "user_delete":
                await this.props.actionUser(this.state.object, this.props.type);
                break;
            case "showtime_delete":
                await this.props.actionShowtime(this.state.object, this.props.type);
                break;
            default:
                break;
        }
        await this.handleClose();
        await this.props.refesh();
        this.setState({
            object: {
                username: "",
                email: "",
                password: ""
            }
        });
    }

    render() {
        return (
            <>
                <Modal
                    show={this.state.deleteModal}
                    onHide={this.handleClose}
                    backdrop="static"
                >
                    <Modal.Header className='warning-header userModal-header'>
                        <span className='warning-sign userModal-sign'
                            onClick={this.handleClose}
                        >x</span>
                        <h5 className="modal-title">DELETE</h5>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure to delete?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='btn btn-primary' onClick={this.handleSubmit} >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actionUser: async (object, type) => {
            await dispatch(action.actUserManagement(object, type));
        },
        actionBranch: async (object, type) => {
            await dispatch(action.actBranchManagement(object, type));
        },
        actionShowtime: async (ojbect, type) => {
            await dispatch(action.actShowtimeManagement(ojbect, type));
        },
    }
}

export default connect(null, mapDispatchToProps)(DeleteModal);