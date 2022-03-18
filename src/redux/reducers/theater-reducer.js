import * as Actiontype from './../constants/action-type';

let initialState = {
    listTheaters: [],
    theater: {}
}

const theaterReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_LIST_THEATERS: {
            state.listTheaters = action.listTheaters;
            return { ...state };
        }
        case Actiontype.GET_DETAIL_THEATER: {
            state.theater = action.theater;
            return { ...state };
        }
        default:
            return { ...state }
    }
}

export default theaterReducer;