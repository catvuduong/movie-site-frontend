import * as Actiontype from './../constants/action-type';

let initialState = {
    listTickets: [],
}

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_LIST_TICKETS: {
            state.listTickets = action.listTickets;
            return { ...state };
        }
        default:
            return { ...state }
    }
}

export default ticketReducer;