import * as Actiontype from './../constants/action-type';

let initialState = {
    listMovies: [],
    movie: [],
    linkMovie: "",
}

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_LIST_MOVIES: {
            state.listMovies = action.listMovies;
            return { ...state };
        }
        case Actiontype.GET_LINK_MOVIE: {
            state.linkMovie = action.linkMovie;
            return { ...state }
        }
        case Actiontype.GET_DETAILS_MOVIE: {
            state.movie = action.movie;
            return { ...state }
        }
        default:
            return { ...state }
    }
}

export default movieReducer;