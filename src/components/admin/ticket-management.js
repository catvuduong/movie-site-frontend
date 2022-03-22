import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as action from './../../redux/actions/index-action';
import TicketModal from './admin-modals/ticket-modal'

class TicketManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    async componentDidMount() {
        await this.props.getListTickets();
    }

    handleRefesh = () => {
        this.props.getListTickets();
    }

    render() {
        let orderNumber = 1;
        let { listTickets } = this.props;
        return (
            <div className="myBranchManament text-center">
                {/* <button className="btn btn-primary add_branch" data-toggle="modal"
                    data-target="#userInfoModal"
                    onClick={() => {
                        this.setState({ objectEdit: null, type: null });
                    }}
                >Add Users</button> */}
                <h3 className="my-3">LIST OF TICKETS</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Theater</th>
                            <th scope="col">Movie</th>
                            <th scope="col">Showtime</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listTickets.map(item => (
                            <tr key={item.id}>
                                <th scope="row">{orderNumber++}</th>
                                <td>
                                    <img src={`https://localhost:5001${item.showtime.theater.image}`} alt="" />
                                    <h4>{item.showtime.theater.name}</h4>
                                </td>
                                <td>
                                    <img src={item.showtime.movie.thumbnail} alt="" />
                                    <h4>{item.showtime.movie.name}</h4>
                                </td>
                                <td>
                                    <h4>  {moment(item.showtime.time).format("HH:mm")}</h4>
                                    <h4>Position: {item.verticalPos} : {item.horizontalPos}</h4>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn--delete"
                                        data-toggle="modal"
                                        data-target="#submitDeleteTicketModal"
                                        onClick={() => {
                                            this.setState({ objectEdit: item, type: "delete" })
                                        }}
                                    >
                                        Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <TicketModal objectEdit={this.state.objectEdit} type={this.state.type} refesh={this.handleRefesh}></TicketModal>
            </div>
        )
    }

}
const mapDispatchToProps = dispatch => {
    return {
        getListTickets: async () => {
            await dispatch(action.actGetListTicketsAPI())
        },
    }
}

const mapStateToProps = state => {
    return {
        listTickets: state.ticketReducer.listTickets,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TicketManagement);


