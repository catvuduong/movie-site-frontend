import React, { Component } from 'react';
import { connect } from "react-redux";

class ShowtimesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            branches: [],
            theaters: [],
        }
    }
    async componentDidMount() {
        if (await this.props.listBranches) {
            this.setState({
                completeLoadingSign: true,
                branches: this.props.listBranches,
                theaters: this.props.listBranches[0].theaters,
            });
        }
        //turn on active at first branch and  first theater
        let btnsBranch = document.getElementsByClassName('cinema_btn');
        let btnsTheater = document.getElementsByClassName('theater_btn');
        if (btnsBranch[0] && btnsTheater[0]) {
            btnsBranch[0].className += ' btnsBranch_active';
            btnsTheater[0].className += " btnsTheater_active";
        }
    }

    changeBranch = (index = 0) => {
        this.setState({
            theaters: this.props.listBranches[index].theaters,
            movies: this.props.listBranches[index].theaters[0].showtimes.map(x => x.movie),
        });
        let btnsBranch = document.getElementsByClassName('cinema_btn');
        for (let i = 0; i < btnsBranch.length; i++) {
            let current = document.getElementsByClassName('btnsBranch_active');
            if (current.length > 0) {
                current[0].className = current[0].className.replace(' btnsBranch_active', '');
            }
            btnsBranch[index].className += ' btnsBranch_active';
        }
        // active first theater of list branches
        let btnsTheater = document.getElementsByClassName('theater_btn');
        for (let i = 0; i < btnsTheater.length; i++) {
            let current = document.getElementsByClassName('btnsTheater_active');
            if (current.length > 0) {
                current[0].className = current[0].className.replace('btnsTheater_active', '');
            }
            btnsTheater[0].className += ' btnsTheater_active';
        }
    }

    changeTheater(index = 0) {
        this.setState({

        });
        let btnsTheater = document.getElementsByClassName('theater_btn');
        for (let i = 0; i < btnsTheater.length; i++) {
            let current = document.getElementsByClassName('btnsTheater_active');
            if (current.length > 0) {
                current[0].className = current[0].className.replace(' btnsTheater_active', '');
            }
            btnsTheater[index].className += ' btnsTheater_active';
        }
    }


    render() {
        return (
            <div className="container">
                <div className="row showtimes_detail">
                    <div className="col-lg-3 col-md-4 col-5 cinema_logo cinema_line">
                        {
                            this.state.branches.map((item, index) => (
                                // TODO: Add generic domain
                                <div className="item_line cinema_btn" key={index} onClick={() => this.changeBranch(index)}>
                                    <span> <img src={"https://localhost:5001" + item.image} alt="" /></span><span>{item.name}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-lg-9 col-md-8  col-7  theater_logo cinema_line">
                        {
                            this.state.theaters.map((item, index) => (
                                <div className="item_line theater_btn" key={index} onClick={() => this.changeTheater(index)}>
                                    <div className="row theater_line" >
                                        <div className="col-2 theater_image">
                                            <img src={"https://localhost:5001" + item.image} alt="" />
                                        </div>
                                        <div className="col-10 theater_name">
                                            <div><span>{item.branch.name}</span> - <span>{item.name}</span></div>
                                            <div className="theater_address">{item.address}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(ShowtimesDetail);
