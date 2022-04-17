import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../redux/actions/index-action';
import DeleteModal from './admin-modals/delete-modal';
import ShowtimeModal from './admin-modals/showtime-modal';

class ShowtimeManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objectEdit: null,
            type: "",
        }
        this.controlActionModal = React.createRef();
        this.controlDeleteModal = React.createRef();
    }
    async componentDidMount() {
        await this.props.getListShowtime();
    }

    handleRefesh = () => {
        this.props.getListShowtime();
    }

    render() {
        let orderNumber = 1;
        let { listShowtimes } = this.props
        return (
            <div className="myBranchManament showtimeM text-center">
                <button className="btn btn-primary add_branch" data-toggle="modal"
                    data-target="#showtimeInfoModal"
                    onClick={() => {
                        this.setState({ objectEdit: null, type: null });
                        this.controlActionModal.handleShow();
                    }}
                >Add Showtime</button>
                <h3 className="my-3">LIST OF SHOWTIMES</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='orderM' scope="col">Order</th>
                            <th scope="col">Theater</th>
                            <th scope="col">Movie</th>
                            <th className='showtimeM-thTime' scope="col">Time</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className='showtimeM-body'>
                        {listShowtimes.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th className='orderM' scope="row">{orderNumber++}</th>
                                    <td>{item.theater.name}</td>
                                    <td>{item.movie.name}</td>
                                    <td className='showtimeM-time'>{item.time}</td>
                                    <td className='showtimeM-td'>
                                        <button className="btn btn-success btn--edit"
                                            onClick={() => {
                                                this.setState({ objectEdit: item, type: "edit" });
                                                this.controlActionModal.handleShow();
                                            }}>Edit</button>
                                        <button className="btn btn-danger btn--delete"
                                            onClick={() => {
                                                this.setState({ objectEdit: item, type: "showtime_delete" });
                                                this.controlDeleteModal.handleShow();
                                            }}>Delete</button>
                                    </td>
                                </tr >
                            );
                        })}
                    </tbody>
                </table>
                <ShowtimeModal
                    objectEdit={this.state.objectEdit}
                    type={this.state.type}
                    refesh={this.handleRefesh}
                    actionRef={ref => (this.controlActionModal = ref)}
                />
                <DeleteModal
                    objectEdit={this.state.objectEdit}
                    type={this.state.type}
                    refesh={this.handleRefesh}
                    deleteRef={ref => (this.controlDeleteModal = ref)}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getListShowtime: async () => {
            await dispatch(action.actGetListShowtimesAPI())
        },
    }
}

const mapStateToProps = state => {
    return {
        listShowtimes: state.showtimeReducer.listShowtimes,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowtimeManagement);


