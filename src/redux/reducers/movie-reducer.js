import * as Actiontype from './../constants/action-type';

let initialState = {
    listMovie: [],
    movie: {},
    linkMovie: "",
}

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_LIST_MOVIE: {
            state.listMovie = action.listMovie;
            return { ...state };
        }
        case Actiontype.GET_LIST_CAROUSELMOVIE: {

            return { ...state };
        }

        case Actiontype.GET_LINK_MOVIE: {
            state.linkMovie = action.linkMovie;
            return { ...state }
        }
        default:
            return { ...state }
    }
}

export default movieReducer;