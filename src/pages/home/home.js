import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './../../redux/actions/index-action';
import Carousel from './../../components/home/carousel';
import MovieModal from './../../components/home/movie-modal';
import ListMovie from './../../components/home/list-movie';
import Cinema from './../../components/home/cinema';
import Article from './../../components/home/article';
import Apps from './../../components/home/apps';
import Banner from './../../components/home/banner';
import LoadingScreen from './../home/loading-screen';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signLoading: false
        }
    }
    async componentDidMount() {
        await this.props.getListBranches();
        this.setState({ signLoading: true });
    }

    render() {
        if (this.state.signLoading === true) {
            return (
                <div>
                    {/* <div className="" style={{ height: "120px" }}></div> */}
                    <Carousel></Carousel>
                    <ListMovie></ListMovie>
                    <Cinema listBranches={this.props.listBranches}></Cinema>
                    <Article></Article>
                    <Apps></Apps>
                    <MovieModal></MovieModal>
                    <Banner></Banner>
                    {/* <div className="" style={{ height: "120px" }}></div> */}
                </div>
            )
        }
        return <LoadingScreen></LoadingScreen>
    }
}

const mapStateToProps = state => {
    return {
        listBranches: state.branchReducer.listBranches,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getListBranches: async () => {
            await dispatch(action.actGetListBranchesAPI());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
