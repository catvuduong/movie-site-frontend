import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import { Modal, Button } from 'react-bootstrap';

class TicketModal extends Component {

    handleDelete = async () => {
        await this.props.deleteTicket(this.props.objectEdit, this.props.type);
        await this.props.refesh();
        $('#submitDeleteTicketModal').modal('hide');
    }

    render() {
        return (
            <div className="modal fade" id="submitDeleteTicketModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteTicket: async (object, type) => {
            await dispatch(action.actTicketManagement(object, type));
        }
    }
}

export default connect(null, mapDispatchToProps)(TicketModal);