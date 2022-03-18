import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './../../redux/actions/index-action';
import UserModal from './admin-modals/user-modal'

class UserManament extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUsers: []
        }
    }

    async componentDidMount() {
        await this.props.getListUsers();
        // console.log(this.state);
    }

    handleRefesh = () => {
        setTimeout(() => {
            this.props.getListUsers();
        }, 500);
    }

    render() {
        let orderNumber = 1;
        let { listUsers } = this.props;
        return (
            <div className="myBranchManament text-center">
                <button className="btn btn-primary add_branch" data-toggle="modal"
                    data-target="#userInfoModal"
                    onClick={() => {
                        this.setState({ objectEdit: null, type: null });
                    }}
                >Add Users</button>
                <h3 className="my-3">LIST OF USERS</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{orderNumber++}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button className="btn btn-success btn--edit" data-toggle="modal"
                                            data-target="#userInfoModal" onClick={() => {
                                                this.setState({ objectEdit: item, type: "edit" })
                                            }}>Edit</button>
                                        <button className="btn btn-danger btn--delete" data-toggle="modal"
                                            data-target="#submitDeleteUserModal" onClick={() => {
                                                this.setState({ objectEdit: item, type: "delete" })
                                            }}>Delete</button>
                                    </td>
                                </tr >
                            );
                        })}
                    </tbody>
                </table>
                <UserModal objectEdit={this.state.objectEdit} type={this.state.type} refesh={this.handleRefesh}></UserModal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getListUsers: async () => {
            await dispatch(action.actGetListUsersAPI())
        },
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.userReducer.listUsers,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserManament);


