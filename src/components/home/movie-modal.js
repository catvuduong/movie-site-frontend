import React, { Component } from 'react';

class MovieModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkTrailer: ""
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.link) {
            this.setState({
                linkTrailer: nextProps.link
            });
        }
    }


    stopVideo = () => {
        var videos = document.querySelectorAll('iframe');
        Array.prototype.forEach.call(videos, function (video) {
            if (video.tagName.toLowerCase() === 'video') {
                video.pause();
            } else {
                var src = video.src;
                video.src = src;
            }
        });
    }
    render() {
        return (
            <div className="modal fade myMovieModal" id="exampleModalCenter" tabIndex={-1} role="dialog"
                onClick={() => { this.stopVideo() }}
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={() => { this.stopVideo() }}
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                        <iframe title="myFrame" width={560} height={315} src={this.state.linkTrailer} frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                </div>
            </div>
        )
    }
}



export default MovieModal;
