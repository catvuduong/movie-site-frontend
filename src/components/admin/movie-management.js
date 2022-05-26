import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './../../redux/actions/index-action';
import MovieModal from './admin-modals/movie-modal';
import DeleteModal from './admin-modals/delete-modal';

class MovieManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listMovies: []
        }
        this.controlActionModal = React.createRef();
        this.controlDeleteModal = React.createRef();
    }

    async componentDidMount() {
        await this.props.getListMovie();
    }

    handleRefesh = () => {
        setTimeout(() => {
            this.props.getListMovie();
        }, 500);
    }

    render() {
        let orderNumber = 1;
        let { listMovies } = this.props
        return (
            <div className="myMovieManament text-center">
                <button className="btn btn-primary add_branch" data-toggle="modal"
                    data-target="#movieInfoModal"
                    onClick={() => {
                        this.setState({ objectEdit: null, type: null });
                        this.controlActionModal.handleShow();
                    }}
                >Add Movie</button>
                <h3 className="my-3">LIST OF MOVIES</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='orderM' scope="col">Order</th>
                            <th scope="col">Name</th>
                            <th className='movieM-thThumbnail' scope="col">Thumbnail</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className='movieM-body'>
                        {listMovies.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th className='orderM' scope="row">{orderNumber++}</th>
                                    <td>{item.name}</td>
                                    <td className='movieM-thumbnail'>{item.thumbnail}</td>
                                    <td>
                                        <button className="btn btn-success btn--edit" data-toggle="modal"
                                            data-target="#movieInfoModal" onClick={() => {
                                                this.setState({ objectEdit: item, type: "edit" });
                                                this.controlActionModal.handleShow();
                                            }}>Edit</button>
                                        <button className="btn btn-danger btn--delete" data-toggle="modal"
                                            data-target="#submitDeleteMovieModal" onClick={() => {
                                                this.setState({ objectEdit: item, type: "movie_delete" });
                                                this.controlDeleteModal.handleShow();
                                            }}>Delete</button>
                                    </td>
                                </tr >
                            );
                        })}
                    </tbody>
                </table>
                <MovieModal
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
        getListMovie: async () => {
            await dispatch(action.actGetListMoviesAPI())
        },
    }
}

const mapStateToProps = state => {
    return {
        listMovies: state.movieReducer.listMovies,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieManagement);


