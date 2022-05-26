import React, { Component } from 'react'

export default class Description extends Component {
    render() {
        let { movie } = this.props;
        return (
            <div className="container">
                <div className="row descript_content">
                    <div className="col-6 infomation">
                        <p>Tên phim</p>
                        <p>{movie.name}</p>
                    </div>
                    <div className="col-6 description">
                        <p>Nội dung</p>
                        <p>{movie.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}
