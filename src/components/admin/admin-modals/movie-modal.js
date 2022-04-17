import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import { Modal, Button } from 'react-bootstrap';

class MovieModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                name: "",
                thumbnail: ""
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

    handleShow = () => {
        this.setState({ actionModal: true })
    }

    handleClose = () => {
        this.setState({ actionModal: false })
    }

    handleSubmit = async e => {
        e.preventDefault();
        await this.props.actionMovie(this.state.object, this.props.type);
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
                    <h5 className="modal-title">{this.props.objectEdit ? "EDIT MOVIE" : "ADD MOVIE"}</h5>
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
                                <input type="text" className="form-control" onChange={this.handleOnChange} name="thumbnail" value={this.state.object.thumbnail} />
                            </div>
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
        actionMovie: async (ojbect, type) => {
            await dispatch(action.actMovieManagement(ojbect, type));
        }
    }
}

export default connect(null, mapDispatchToProps)(MovieModal);