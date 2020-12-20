import React, { Component } from 'react';
import { connect } from 'react-redux';



class MovieModal extends Component {
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
        let { linkMovie } = this.props;
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
                        <iframe title="myFrame" width={560} height={315} src={linkMovie} frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        linkMovie: state.movieReducer.linkMovie
    }
}

export default connect(mapStateToProps, null)(MovieModal);
