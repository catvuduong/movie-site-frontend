import * as Actiontype from '../constants/action-type';

let initialState = {
    showtime: {},
    showtimeId: ''
}

const bookingTicketReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_SHOWTIME_BYID: {
            state.showtime = action.showtime;
            return { ...state };
        }

        case Actiontype.MOVE_TO_BOOKING_BYSHOWTIMEID: {
            state.showtimeId = action.showtimeId;
            return { ...state };
        }
        default:
            return { ...state }
    }
}

export default bookingTicketReducer;