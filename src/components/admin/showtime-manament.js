import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './../../redux/actions/index-action';
import ShowtimeModal from './admin-modals/showtime-modal';

class ShowtimeManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
        await this.props.getListShowtime();
    }

    handleRefesh = () => {
        setTimeout(() => {
            this.props.getListShowtime();
        }, 500);
    }

    render() {
        let orderNumber = 1;
        let { listShowtimes } = this.props
        return (
            <div className="myBranchManament text-center">
                <button className="btn btn-primary add_branch" data-toggle="modal"
                    data-target="#showtimeInfoModal"
                    onClick={() => {
                        this.setState({ objectEdit: null, type: null });
                    }}
                >Add Showtime</button>
                <h3 className="my-3">LIST OF SHOWTIMES</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Theater</th>
                            <th scope="col">Movie</th>
                            <th scope="col">Time</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listShowtimes.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{orderNumber++}</th>
                                    <td>{item.theater.name}</td>
                                    <td>{item.movie.name}</td>
                                    <td>{item.time}</td>
                                    <td>
                                        <button className="btn btn-success btn--edit" data-toggle="modal"
                                            data-target="#showtimeInfoModal" onClick={() => {
                                                this.setState({ objectEdit: item, type: "edit" })
                                            }}>Edit</button>
                                        <button className="btn btn-danger btn--delete" data-toggle="modal"
                                            data-target="#submitDeleteShowtimeModal" onClick={() => {
                                                this.setState({ objectEdit: item, type: "delete" })
                                            }}>Delete</button>
                                    </td>
                                </tr >
                            );
                        })}
                    </tbody>
                </table>
                <ShowtimeModal objectEdit={this.state.objectEdit} type={this.state.type} refesh={this.handleRefesh}></ShowtimeModal>
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


