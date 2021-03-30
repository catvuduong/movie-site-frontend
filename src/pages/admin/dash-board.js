import React, { Component } from 'react';
import Collapse from 'react-bootstrap/Collapse'
import MovieManagement from '../../components/admin/movie-management';
import UserManagement from '../../components/admin/user-management';
import BranchManagement from '../../components/admin/branch-management';
import TheaterManagement from '../../components/admin/theater-management';




export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleClicked: false,
            component: TheaterManagement,
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
    handleComponent = component => {
        this.setState({
            component
        })
    }
    checkOpenCollapse = collapse => {
        if (collapse) {
            return "down"
        }
        return "right"
    }

    renderHTML = Component => (<Component></Component>)

    render() {
        let { openBranchCollapse, openTheaterCollapse, openMovieCollapse, openUserCollapse, toggleClicked, component } = this.state;
        let toggleClass = toggleClicked ? "toggled" : "";
        return (
            <div className="myDashboard text-left">
                <div className={`d-flex ${toggleClass}`} id="wrapper">
                    <div className="bg-light border-right" id="sidebar-wrapper">
                        <div className="sidebar-heading dashboard_title">
                            Management
                        </div>
                        <div className="list-group list-group-flush dashboard_sidebar">
                            <div className="dashboard_item">
                                <button className="list-group-item list-group-item-action bg-light " aria-controls="branch-collapse"
                                    aria-expanded={openBranchCollapse}
                                    onClick={() => this.setState({ openBranchCollapse: !openBranchCollapse })}>Branch
                                         <i className={`fa fa-caret-${this.checkOpenCollapse(openBranchCollapse)} ml-5`}></i>
                                </button>
                                <Collapse in={openBranchCollapse}>
                                    <div id="branch-collapse" onClick={() => { this.handleComponent(BranchManagement) }}>
                                        <div className="dashboard_getlist">
                                            GET BRANCH LIST
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="dashboard_item">
                                <button className="list-group-item list-group-item-action bg-light " aria-controls="theater-collapse"
                                    aria-expanded={openTheaterCollapse}
                                    onClick={() => this.setState({ openTheaterCollapse: !openTheaterCollapse })}>Theater
                                         <i className={`fa fa-caret-${this.checkOpenCollapse(openTheaterCollapse)} ml-5`}></i>
                                </button>
                                <Collapse in={openTheaterCollapse}>
                                    <div id="branch-theater" onClick={() => { this.handleComponent(TheaterManagement) }}>
                                        <div className="dashboard_getlist">
                                            GET THEATER LIST
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="dashboard_item">
                                <button className="list-group-item list-group-item-action bg-light " aria-controls="movie-collapse"
                                    aria-expanded={openMovieCollapse}
                                    onClick={() => this.setState({ openMovieCollapse: !openMovieCollapse })}>Movie
                                         <i className={`fa fa-caret-${this.checkOpenCollapse(openMovieCollapse)} ml-5`}></i>
                                </button>
                                <Collapse in={openMovieCollapse}>
                                    <div id="movie-collapse">
                                        <div className="dashboard_getlist" onClick={() => { this.handleComponent(MovieManagement) }}>GET LIST MOVIE</div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="dashboard_item">
                                <button className="list-group-item list-group-item-action bg-light dashboard_item" aria-controls="user-collapse"
                                    aria-expanded={openUserCollapse}
                                    onClick={() => this.setState({ openUserCollapse: !openUserCollapse })}>User
                                   <i className={`fa fa-caret-${this.checkOpenCollapse(openUserCollapse)} ml-5`}></i>
                                </button>
                                <Collapse in={openUserCollapse}>
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
                            {this.renderHTML(component)}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
