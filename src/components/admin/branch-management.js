import React, { Component } from 'react';
import * as action from '../../redux/actions/index-action';
import { connect } from 'react-redux';
import ModalBranch from './modal-branch';

class BranchManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            objectEdit: null,
            type: "",
        }
    }
    async componentDidMount() {
        await this.props.getListBranches();
    }

    renderListBranches = list => {
        let orderNumber = 1;
        return list.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{orderNumber++}</th>
                    <td>{item.name}</td>
                    <td>{item.image}</td>
                    <td>
                        <button className="btn btn-success btn--edit" data-toggle="modal"
                            data-target="#branchInfoModal" onClick={() => {
                                this.setState({ objectEdit: item, type: "edit" })
                            }}>Edit</button>
                        <button className="btn btn-danger btn--delete" data-toggle="modal"
                            data-target="#submitDeleteModal" onClick={() => {
                                this.setState({ objectEdit: item, type: "delete" })
                            }}>Delete</button>
                    </td>
                </tr >
            );
        })
    }
    render() {
        let { listBranches } = this.props
        return (
            <div className="myBranchManament text-center">
                <button className="btn btn-primary add_branch" data-toggle="modal"
                    data-target="#branchInfoModal" onClick={() => {
                        this.setState({ objectEdit: null })
                    }} >Add Branch</button>
                <h3 className="my-3">LIST OF BRANCH</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Name</th>
                            <th scope="col">Thumbnail</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderListBranches(listBranches)}
                    </tbody>
                </table>
                <ModalBranch objectEdit={this.state.objectEdit} type={this.state.type}></ModalBranch>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getListBranches: async () => {
            dispatch(action.actGetListBranchesAPI())
        }
    }
}
const mapStateToProps = state => {
    return {
        listBranches: state.branchReducer.listBranches,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchManagement);
