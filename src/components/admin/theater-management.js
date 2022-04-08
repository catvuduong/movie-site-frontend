import React, { Component } from 'react';
import * as action from '../../redux/actions/index-action';
import { connect } from 'react-redux';
import ModalTheater from './admin-modals/modal-theater';

class TheaterManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objectEdit: null,
            type: "",
        }
    }

    async componentDidMount() {
        await this.props.getListTheaters();
        await this.props.getListBranch();
    }

    handleRefesh = () => {
        setTimeout(() => {
            this.props.getListTheaters();
        }, 500);
    }

    renderListBranches = list => {
        let orderNumber = 1;
        return list.map((item, index) => {
            return (
                <tr key={index}>
                    <th className='orderM' scope="row">{orderNumber++}</th>
                    <td>{item.name}</td>
                    <td className='theaterM-image'>{item.image}</td>
                    <td>
                        <button className="btn btn-success btn--edit" data-toggle="modal"
                            data-target="#theaterInfoModal" onClick={() => {
                                this.setState({ objectEdit: item, type: "edit" })
                            }}>Edit</button>
                        <button className="btn btn-danger btn--delete" data-toggle="modal"
                            data-target="#submitDeleteTheaterModal" onClick={() => {
                                this.setState({ objectEdit: item, type: "delete" })
                            }}>Delete</button>
                    </td>
                </tr >
            );
        })
    }

    render() {
        let { listTheaters } = this.props
        return (
            <div className="myBranchManament text-center">
                <button className="btn btn-primary add_branch" data-toggle="modal"
                    data-target="#theaterInfoModal" onClick={() => {
                        this.setState({ objectEdit: null, type: null });
                    }} >Add Theater</button>
                <h3 className="my-3">LIST OF THEATERS</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='orderM' scope="col">Order</th>
                            <th scope="col">Name</th>
                            <th className='theaterM-thImage' scope="col">Thumbnail</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderListBranches(listTheaters)}
                    </tbody>
                </table>
                <ModalTheater objectEdit={this.state.objectEdit} type={this.state.type} refesh={this.handleRefesh}></ModalTheater>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getListTheaters: async () => {
            await dispatch(action.actGetListTheatersAPI())
        },
        getListBranch: async () => {
            await dispatch(action.actGetListBranchesAPI())
        }
    }
}

const mapStateToProps = state => {
    return {
        listTheaters: state.theaterReducer.listTheaters,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TheaterManagement);
