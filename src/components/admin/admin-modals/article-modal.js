import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../redux/actions/index-action';
import { Modal, Button } from 'react-bootstrap';

class ArticleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                title: "",
                thumbnail: "",
                content: ""
            },
            actionModal: false
        }
    }

    componentDidMount() {
        const { actionRef } = this.props;
        actionRef(this);
    }

    componentWillUnmount() {
        const { actionRef } = this.props;
        actionRef(undefined);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.objectEdit) {
            // console.log(nextProps.objectEdit);
            this.setState({
                object: {
                    id: nextProps.objectEdit.id,
                    title: nextProps.objectEdit.title,
                    thumbnail: nextProps.objectEdit.thumbnail,
                    content: nextProps.objectEdit.content
                }
            });
        }
        else {
            this.setState({
                object: {
                    title: "",
                    thumbnail: "",
                    content: ""
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
        await this.props.actionArticle(this.state.object, this.props.type);
        await this.handleClose();
        await this.props.refesh();
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
                    <h5 className="modal-title">{this.props.objectEdit ? "EDIT BRANCH" : "ADD BRANCH"}</h5>
                </Modal.Header>
                <Modal.Body className='warning-body'>
                    <form onSubmit={this.handleSubmit}>
                        <div className="text-left">
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" onChange={this.handleOnChange} name="title" value={this.state.object.title} />
                            </div>
                            <div className="form-group">
                                <label>Thumbnail</label>
                                <input type="text" className="form-control" onChange={this.handleOnChange} name="thumbnail" value={this.state.object.thumbnail} />
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <input type="text" className="form-control" onChange={this.handleOnChange} name="content" value={this.state.object.content} />
                            </div>
                        </div>
                        <Button type="submit" className="btn btn-success text-right"
                            onClick={() => this.handleSubmit}
                        >
                            {this.props.objectEdit ? "Update" : "Submit"}
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actionArticle: async (ojbect, type) => {
            await dispatch(action.actArticleManagement(ojbect, type));
        }
    }
}

export default connect(null, mapDispatchToProps)(ArticleModal);