import React, { Component } from 'react';
import * as  action from './../../redux/actions/index-action';
import { connect } from 'react-redux';
import Description from './../../components/details-movie/description';
import ShowtimesDetail from './../../components/details-movie/showtimes-detailsmoive';
import DetailsMovieModal from './../../components/details-movie/details-movie-modal';
import LoadingScreen from './loading-screen';
import Banner from './../../components/home/banner';
import { scroller } from 'react-scroll'
import WarningModal from '../../components/modals/warning-modal';

class DetailsMovie extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            clickedShowtimes: true,
            clickedDescription: false,
            component: ShowtimesDetail,
            checkingLoading: false,
            movie: {},
            id: ''
        }
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        const id = this.props.match.params.id;
        await this.props.getDetailsMovie(id);
        await this.props.getListBranches();
        this.setState({ movie: this.props.movie, id });
        setTimeout(() => {
            this.setState({ checkingLoading: true })
        }, 500);
    }

    handleShowtimes = () => {
        this.setState({
            clickedShowtimes: true,
            clickedDescription: false,
            component: ShowtimesDetail,
        })
    }
    handleDescription = () => {
        this.setState({
            clickedDescription: true,
            clickedShowtimes: false,
            component: Description
        })
    }

    renderDisplay = Component => (<Component id={this.state.id} movie={this.props.movie} listBranches={this.props.listBranches} {...this.props}></ Component>);

    scrollTo = name => {
        scroller.scrollTo(name, {
            duration: 1,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }

    render() {
        if (this.state.checkingLoading === true) {
            let { movie } = this.state
            let showtimes = this.state.clickedShowtimes ? "active" : "";
            let descript = this.state.clickedDescription ? "active" : "";
            return (
                <>
                    <div className="myDetailsMovie">
                        <div className="backgroud_cover" style={{
                            backgroundImage: `url(${movie.thumbnail})`
                        }} ></div>
                        <div className="cover_second"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-sm-3 col-5 movie_image">
                                    <img src={movie.thumbnail} alt="" />
                                    <button className="fa fa-play movie_play" onClick={() => { }} data-toggle="modal" data-target="#detailsMovieModal"></button>
                                </div>
                                <div className="col-lg-3 col-sm-6 col-7 movie_name">
                                    <p>{movie.name}</p>
                                    <button className="btn btn-danger"
                                        onClick={() => this.scrollTo("srollToCinema")}
                                    >Mua vé</button>
                                </div>
                                <div className="col-lg-6 col-sm-3 movie_rate">
                                    <span>{movie.rate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DetailsMovieModal link={movie.trailer} ></DetailsMovieModal>
                    <div className="myShowtimes">
                        <div className="showtimes_title">
                            <button className={`showtime_btns ${showtimes}`} onClick={() => this.handleShowtimes()}>Lịch Chiếu</button>
                            <button className={`showtime_btns ${descript}`} onClick={() => this.handleDescription()}>Thông Tin</button>
                        </div>
                        <div className="showtimes_content">{this.renderDisplay(this.state.component)}</div>
                    </div >
                    <Banner></Banner>
                    <WarningModal {...this.props} />
                </>
            )
        }
        return (<LoadingScreen></LoadingScreen>);
    }
}

const mapDispatchTopProps = dispatch => {
    return {
        getDetailsMovie: async id => {
            await dispatch(action.actGetDetailsMovie(id))
        },
        getListBranches: async () => {
            await dispatch(action.actGetListBranchesAPI());
        }
    }
}
const mapStateToProps = state => {
    return {
        listBranches: state.branchReducer.listBranches,
        movie: state.movieReducer.movie
    }
}

export default connect(mapStateToProps, mapDispatchTopProps)(DetailsMovie);
