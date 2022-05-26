import * as Actiontype from './../constants/action-type';

let initialState = {
    listShowtimes: [],
}

const showtimeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_LIST_SHOWTIMES: {
            state.listShowtimes = action.listShowtimes;
            return { ...state };
        }
        default:
            return { ...state }
    }
}

export default showtimeReducer;