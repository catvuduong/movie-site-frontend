import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import { Modal, Button } from 'react-bootstrap';

class ShowtimeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                time: "",
                theaterId: "",
                movieId: ""
            },
            actionModal: false
        }
    }

    async componentDidMount() {
        const { actionRef } = this.props;
        actionRef(this);
        await this.props.getListTheaters();
        await this.props.getListMovies();
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
                    time: nextProps.objectEdit.time,
                }
            });
        }
        else {
            this.setState({
                object: {
                    time: "2015-05-16T10:00:00",
                    theaterId: "",
                    movieId: ""
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
        await this.props.actionShowtime(this.state.object, this.props.type);
        await this.props.refesh();
        await this.handleClose();
    }

    handleOjectID = list => {
        return list.map((item, index) => {
            return (
                <option key={index} value={item.id} >
                    {item.name}
                </option>
            );
        })
    }

    render() {
        let { listTheaters, listMovies } = this.props;
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
                    <h5 className="modal-title">{this.props.objectEdit ? "EDIT SHOWTIME" : "ADD SHOWTIME"}</h5>
                </Modal.Header>
                <Modal.Body className='warning-body'>
                    <form onSubmit={this.handleSubmit}>
                        <div className="text-left">
                            <div className="form-group">
                                <label>Time</label>
                                <input type="text" className="form-control" onChange={this.handleOnChange} name="time" placeholder="2015-05-16T05:50:06" value={this.state.object.time} />
                            </div>
                            {this.props.objectEdit ? null :
                                <div>
                                    <div className="form-group">
                                        <label>Theater</label>
                                        <select className="form-control" onChange={this.handleOnChange} name="theaterId" value={this.state.object.theaterId} >
                                            <option value="" disabled hidden>Chose theater</option>
                                            {this.handleOjectID(listTheaters)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Movie</label>
                                        <select className="form-control" onChange={this.handleOnChange} name="movieId" value={this.state.object.movieId} >
                                            <option value="" disabled hidden>Chose movie</option>
                                            {this.handleOjectID(listMovies)}
                                        </select>
                                    </div>
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
                </Modal.Body >
            </Modal >
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actionShowtime: async (ojbect, type) => {
            await dispatch(action.actShowtimeManagement(ojbect, type));
        },
        getListTheaters: async () => {
            await dispatch(action.actGetListTheatersAPI());
        },
        getListMovies: async () => {
            await dispatch(action.actGetListMoviesAPI());
        }
    }
}

const mapStateToProps = state => {
    return {
        listTheaters: state.theaterReducer.listTheaters,
        listMovies: state.movieReducer.listMovies
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowtimeModal);