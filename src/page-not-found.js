import React, { Component } from 'react'

export default class PageNotFound extends Component {

    render() {
        return (
            <div className='notfound'>
                <div className='notfound-main'>
                    <div className='notfound-warning'>
                        <h1 className='notfound-heading'>Oops!</h1>
                    </div>
                    <div className='notfound-content'>
                        <h4 className='notfound-title'>404 - PAGE NOT FOUND</h4>
                        <p className='notfound-text'>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                        <button className='notfound-goback'
                            onClick={() => { this.props.history.push('/'); }}
                        >GO TO HOME PAGE</button>
                    </div>
                </div>
            </div>
        )
    }
}

