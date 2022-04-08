import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as ActionType from './../../redux/constants/action-type';

class WarningModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            show: false,
            warning: '',
            image: ''
        }
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        await this.setState({ status: nextProps.warningInfo.status })
        await this.handleShow(this.state.status);
    }

    handleShow = status => {
        // console.log(status);
        switch (status) {
            case "Login successfully": {
                let text = 'Đăng nhập thành công';
                this.setState({
                    show: true,
                    warning: text,
                    image: '/images/successful-warning.png'
                })
                break;
            }
            case "Book successfully": {
                let text = 'Đặt vé thành công';
                this.setState({
                    show: true,
                    warning: text,
                    image: '/images/successful-warning.png'
                })
                break;
            }
            case "Login failed": {
                let text = 'Đăng nhập thất bại';
                this.setState({
                    show: true,
                    warning: text,
                    image: '/images/failed-warning.png'
                })
                break;
            }

            default:
                break;
        }
    }

    handleClose = status => {
        switch (status) {
            case "Login successfully":
                this.setState({
                    show: false,
                    status: ''
                })
                this.props.clearnWarning();
                window.location.reload();
                break;
            case "Book successfully":
                this.setState({
                    show: false,
                    status: ''
                })
                this.props.clearnWarning();
                window.location.reload();
                break;
            default:
                this.setState({
                    show: false,
                    status: ''
                });
                window.location.reload();
                break;
        }
    }

    renderWarning = (warning, image) => {
        return (
            <>
                <Modal.Header className='warning-header'>
                    <span className='warning-sign'
                        onClick={() => this.handleClose(this.state.status)}
                    >x</span>
                </Modal.Header>
                <Modal.Body className='warning-body'>
                    <img className='warning-image' src={image} alt=""></img>
                    <h5 className='warning-text'>
                        {warning}
                    </h5>
                </Modal.Body>
            </>
        )
    }

    render() {
        return (
            <>
                {/* <Button variant="primary" onClick={() => this.setState({
                    show: true,
                    warning: 'Đăng nhập thành công',
                    image: './images/successful-warning.png'
                })}>
                    Launch static backdrop modal
                </Button> */}
                <Modal
                    className='warning'
                    show={this.state.show}
                    onHide={() => this.handleClose(this.state.status)}>
                    <div className='warning-content'>
                        {this.renderWarning(this.state.warning, this.state.image)}
                        <Modal.Footer>
                            <Button className='warning-button' variant="secondary" onClick={() => this.handleClose(this.state.status)}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </div>
                </Modal >
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        warningInfo: state.warningModalReducer.warningInfo,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearnWarning: async () => {
            await dispatch({
                type: ActionType.CLEAR_WARNING_INFO,
            });
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WarningModal);
