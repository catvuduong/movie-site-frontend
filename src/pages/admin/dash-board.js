import React, { Component } from 'react';
import Collapse from 'react-bootstrap/Collapse'
import MovieManagement from '../../components/admin/movie-management';
import UserManagement from '../../components/admin/user-management';
import BranchManagement from '../../components/admin/branch-management';




export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleClicked: false,
            component: BranchManagement,
            openTheaterCollapse: false,
            openMovieCollapse: false,
            openUserCollapse: false,
        }
    }

    handleToggle = () => {
        this.setState({
            toggleClicked: !this.state.toggleClicked
        })
    }
    handleComponent = Component => {
        this.setState({
            component: Component
        })
    }

    renderHTML = Component => (<Component></Component>)

    render() {
        let toggleClass = this.state.toggleClicked ? "toggled" : "";
        let toggleArrowTheater = this.state.openTheaterCollapse ? "down" : "right";
        let toggleArrowMovie = this.state.openMovieCollapse ? "down" : "right";
        let toggleArrorUser = this.state.openUserCollapse ? "down" : "right";
        return (
            <div className="myDashboard text-left">
                <div className={`d-flex ${toggleClass}`} id="wrapper">
                    <div className="bg-light border-right" id="sidebar-wrapper">
                        <div className="sidebar-heading dashboard_title">
                            Management
                        </div>
                        <div className="list-group list-group-flush dashboard_sidebar">
                            <div className="dashboard_item">
                                <button className="list-group-item list-group-item-action bg-light " aria-controls="theater-collapse"
                                    aria-expanded={this.state.openTheaterCollapse}
                                    onClick={() => this.setState({ openTheaterCollapse: !this.state.openTheaterCollapse })}>Branch
                                         <i className={`fa fa-caret-${toggleArrowTheater} ml-5`}></i>
                                </button>
                                <Collapse in={this.state.openTheaterCollapse}>
                                    <div id="theater-collapse" onClick={() => { this.handleComponent(BranchManagement) }}>
                                        <div className="dashboard_getlist">
                                            GET BRANCH LIST
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="dashboard_item">
                                <button className="list-group-item list-group-item-action bg-light " aria-controls="movie-collapse"
                                    aria-expanded={this.state.openMovieCollapse}
                                    onClick={() => this.setState({ openMovieCollapse: !this.state.openMovieCollapse })}>Movie
                                         <i className={`fa fa-caret-${toggleArrowMovie} ml-5`}></i>
                                </button>
                                <Collapse in={this.state.openMovieCollapse}>
                                    <div id="movie-collapse">
                                        <div className="dashboard_getlist" onClick={() => { this.handleComponent(MovieManagement) }}>GET LIST MOVIE</div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="dashboard_item">
                                <button className="list-group-item list-group-item-action bg-light dashboard_item" aria-controls="user-collapse"
                                    aria-expanded={this.state.openUserCollapse}
                                    onClick={() => this.setState({ openUserCollapse: !this.state.openUserCollapse })}>User
                                   <i className={`fa fa-caret-${toggleArrorUser} ml-5`}></i>
                                </button>
                                <Collapse in={this.state.openUserCollapse}>
                                    <div id="user-collapse">
                                        <div className="dashboard_getlist" onClick={() => { this.handleComponent(UserManagement) }}>GET LIST USER</div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                    <div id="page-content-wrapper">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                            <button className="btn btn-primary" id="menu-toggle" onClick={() => { this.handleToggle() }}><i className="fa fa-bars"></i></button>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            </div>
                        </nav>
                        <div className="container-fluid">
                            {this.renderHTML(this.state.component)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
