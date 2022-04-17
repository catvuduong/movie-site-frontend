import React, { Component } from 'react';
import * as action from '../../redux/actions/index-action';
import { connect } from 'react-redux';
import BranchModal from './admin-modals/branch-modal';
import DeleteModal from './admin-modals/delete-modal';

class BranchManagement extends Component {

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
        await this.props.getListBranches();
    }

    handleRefesh = () => {
        setTimeout(() => {
            this.props.getListBranches();
        }, 500);
    }

    renderListBranches = list => {
        let orderNumber = 1;
        return list.map((item, index) => {
            return (
                <tr key={index}>
                    <th className='orderM' scope="row">{orderNumber++}</th>
                    <td>{item.name}</td>
                    <td className='branchM-image'>{item.image}</td>
                    <td>
                        <button className="btn btn-success btn--edit" data-toggle="modal"
                            data-target="#branchInfoModal" onClick={() => {
                                this.setState({ objectEdit: item, type: "edit" })
                                this.controlActionModal.handleShow();
                            }}>Edit</button>
                        <button className="btn btn-danger btn--delete"
                            onClick={() => {
                                this.setState({ objectEdit: item, type: "branch_delete" })
                                this.controlDeleteModal.handleShow();
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
                        this.controlActionModal.handleShow();
                        this.setState({ objectEdit: null })
                    }} >Add Branch</button>
                <h3 className="my-3">LIST OF BRANCHES</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='orderM' scope="col">Order</th>
                            <th scope="col">Name</th>
                            <th className='branchM-thImage' scope="col">Thumbnail</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderListBranches(listBranches)}
                    </tbody>
                </table>
                <BranchModal
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
