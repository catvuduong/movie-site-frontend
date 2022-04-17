import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import { Modal, Button } from 'react-bootstrap';

class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                id: ''
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
                }
            });
        }
        else {
            this.setState({
                object: {
                    id: ''
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
                await this.props.deleteBranch(this.state.object, this.props.type);
                break;
            case "theater_delete":
                await this.props.deleteTheater(this.state.object, this.props.type);
                break;
            case "showtime_delete":
                await this.props.deleteShowtime(this.state.object, this.props.type);
                break;
            case "movie_delete":
                await this.props.deleteMovie(this.state.object, this.props.type);
                break;
            case "article_delete":
                await this.props.deleteArticle(this.state.object, this.props.type);
                break;
            case "user_delete":
                await this.props.deleteUser(this.state.object, this.props.type);
                break;
            case "ticket_delete":
                await this.props.deleteTicket(this.state.object, this.props.type);
                break;
            default:
                break;
        }
        await this.handleClose();
        await this.props.refesh();
        this.setState({
            object: {
                id: ''
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
        deleteBranch: async (object, type) => {
            await dispatch(action.actBranchManagement(object, type));
        },
        deleteShowtime: async (ojbect, type) => {
            await dispatch(action.actShowtimeManagement(ojbect, type));
        },
        deleteTheater: async (ojbect, type) => {
            await dispatch(action.actTheaterManagement(ojbect, type));
        },
        deleteMovie: async (ojbect, type) => {
            await dispatch(action.actMovieManagement(ojbect, type));
        },
        deleteArticle: async (ojbect, type) => {
            await dispatch(action.actArticleManagement(ojbect, type));
        },
        deleteUser: async (object, type) => {
            await dispatch(action.actUserManagement(object, type));
        },
        deleteTicket: async (ojbect, type) => {
            await dispatch(action.actTicketManagement(ojbect, type));
        }
    }
}

export default connect(null, mapDispatchToProps)(DeleteModal);