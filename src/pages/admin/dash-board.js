import React, { Component } from 'react';
import MovieManagement from '../../components/admin/movie-management';
import UserManagement from '../../components/admin/user-management';
import BranchManagement from '../../components/admin/branch-management';
import TheaterManagement from '../../components/admin/theater-management';
import ShowtimeManagement from '../../components/admin/showtime-management';
import ArticleManament from '../../components/admin/article-manament';
import TicketManagement from '../../components/admin/ticket-management';
import WellComeAdmin from '../../components/admin/wellcome-admin';

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleClicked: false,
            activeBranch: false, activeTheaeter: false, activeMovie: false, activeUser: false,
            activeShowtime: false, activeArticle: false, activeTicket: false,
            component: UserManagement,
        }
    }

    componentDidMount() {
        const admin = localStorage.getItem("Admin");
        if (!admin) {
            this.props.history.push('admin');
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

    setActiveClass = sign => {
        switch (sign) {
            case "branch": {
                this.setState({
                    activeBranch: true, activeTheaeter: false, activeMovie: false, activeUser: false, activeShowtime: false, activeArticle: false, activeTicket: false
                })
                break;
            }
            case "theater": {
                this.setState({
                    activeBranch: false, activeTheaeter: true, activeMovie: false, activeUser: false, activeShowtime: false, activeArticle: false, activeTicket: false
                })
                break;
            }
            case "movie": {
                this.setState({
                    activeBranch: false, activeTheaeter: false, activeMovie: true, activeUser: false, activeShowtime: false, activeArticle: false, activeTicket: false
                })
                break;
            }
            case "showtime": {
                this.setState({
                    activeBranch: false, activeTheaeter: false, activeMovie: false, activeUser: false, activeShowtime: true, activeArticle: false, activeTicket: false
                })
                break;
            }
            case "article": {
                this.setState({
                    activeBranch: false, activeTheaeter: false, activeMovie: false, activeUser: false, activeShowtime: false, activeArticle: true, activeTicket: false
                })
                break;
            }
            case "user": {
                this.setState({
                    activeBranch: false, activeTheaeter: false, activeMovie: false, activeUser: true, activeShowtime: false, activeArticle: false, activeTicket: false
                })
                break;
            }
            case "ticket": {
                this.setState({
                    activeBranch: false, activeTheaeter: false, activeMovie: false, activeUser: false, activeShowtime: false, activeArticle: false, activeTicket: true
                })
                break;
            }
            default:
                break;
        }
    }

    renderHTML = Component => (<Component></Component>)

    render() {
        let { toggleClicked, component } = this.state;
        let toggleClass = toggleClicked ? "toggled" : "";
        let activeBranch = this.state.activeBranch ? "active_button" : "";
        let activeTheaeter = this.state.activeTheaeter ? "active_button" : "";
        let activeMovie = this.state.activeMovie ? "active_button" : "";
        let activeUser = this.state.activeUser ? "active_button" : "";
        let activeShowtime = this.state.activeShowtime ? "active_button" : "";
        let activeArticle = this.state.activeArticle ? "active_button" : "";
        let activeTicket = this.state.activeTicket ? "active_button" : "";
        return (
            <div className="myDashboard text-left">
                <div className={`d-flex ${toggleClass}`} id="wrapper">
                    <div className="bg-light border-right" id="sidebar-wrapper">
                        <div className="sidebar-heading dashboard_title">
                            Management
                        </div>
                        <div className="list-group list-group-flush dashboard_sidebar">
                            <div className="dashboard_item">
                                <button className={`list-group-item list-group-item-action ${activeBranch}`}
                                    onClick={() => { this.handleComponent(BranchManagement); this.setActiveClass("branch") }}>
                                    <i className="fab fa-cloudsmith"></i><span>Branch</span>
                                </button>
                            </div>
                            <div className="dashboard_item">
                                <button className={`list-group-item list-group-item-action ${activeTheaeter}`}
                                    onClick={() => { this.handleComponent(TheaterManagement); this.setActiveClass("theater") }}>
                                    <i className="fa fa-theater-masks"></i><span>Theater</span>
                                </button>

                            </div>
                            <div className="dashboard_item">
                                <button className={`list-group-item list-group-item-action ${activeMovie}`}
                                    onClick={() => { this.handleComponent(MovieManagement); this.setActiveClass("movie") }}>
                                    <i className="fa fa-film"></i><span>Movie</span>
                                </button>
                            </div>
                            <div className="dashboard_item">
                                <button className={`list-group-item list-group-item-action ${activeShowtime}`}
                                    onClick={() => { this.handleComponent(ShowtimeManagement); this.setActiveClass("showtime") }}>
                                    <i className="fa fa-clock"></i><span>Showtime</span>
                                </button>
                            </div>
                            <div className="dashboard_item">
                                <button className={`list-group-item list-group-item-action ${activeArticle}`}
                                    onClick={() => { this.handleComponent(ArticleManament); this.setActiveClass("article") }}>
                                    <i className="fa fa-newspaper"></i><span>Article</span>
                                </button>
                            </div>
                            <div className="dashboard_item">
                                <button className={`list-group-item list-group-item-action ${activeUser}`}
                                    onClick={() => { this.handleComponent(UserManagement); this.setActiveClass("user") }}>
                                    <i className="fa fa-user"></i><span>User</span>
                                </button>
                            </div>
                            <div className="dashboard_item">
                                <button className={`list-group-item list-group-item-action ${activeTicket}`}
                                    onClick={() => { this.handleComponent(TicketManagement); this.setActiveClass("ticket") }}>
                                    <i className="fa fa-ticket-alt"></i><span>Ticket</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="page-content-wrapper">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                            <button className="btn btn-primary" id="menu-toggle" onClick={() => { this.handleToggle() }}><i className="fa fa-bars"></i></button>
                            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button> */}
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
