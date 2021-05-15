import * as Actiontype from '../constants/action-type';

let initialState = {
    showtime: {}
}

const bookingTicketReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_SHOWTIME_BYID: {
            state.showtime = action.showtime;
            return { ...state };
        }
        default:
            return { ...state }
    }
}

export default bookingTicketReducer;