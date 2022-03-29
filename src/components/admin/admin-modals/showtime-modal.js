import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import $ from 'jquery';

class ShowtimeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                time: "",
                theaterId: "",
                movieId: ""
            },
        }
    }

    async componentDidMount() {
        await this.props.getListTheaters();
        await this.props.getListMovies();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.objectEdit) {
            console.log(nextProps.objectEdit);
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
                    time: "2015-05-16T05:50:06",
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
    handleSubmit = e => {
        e.preventDefault();
        this.props.actionShowtime(this.state.object, this.props.type);
        this.props.refesh();
        $('#showtimeInfoModal').modal('hide');
    }

    handleDelete = () => {
        this.props.actionShowtime(this.state.object, this.props.type)
        this.props.refesh();
        $('#submitDeleteShowtimeModal').modal('hide');
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
            <div>
                <div
                    className="modal fade"
                    id="showtimeInfoModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="modelTitleId"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content text-right">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.objectEdit ? "EDIT SHOWTIME" : "ADD SHOWTIME"}</h5>
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
                                    <button type="submit" className="btn btn-success">
                                        {this.props.objectEdit ? "Update" : "Submit"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="submitDeleteShowtimeModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure to delete?
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
        actionShowtime: async (ojbect, type) => {
            await dispatch(action.actShowtimeManagement(ojbect, type));
        },
        getListTheaters: async () => {
            await dispatch(action.actGetListTheatersAPI())
        },
        getListMovies: async () => {
            await dispatch(action.actGetListMoviesAPI())
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