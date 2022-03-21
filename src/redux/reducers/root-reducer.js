import { combineReducers } from 'redux';
import movieReducer from './movie-reducer';
import branchReducer from './branch-reducer';
import theaterReducer from './theater-reducer';
import articleReducer from './article-reducer';
import bookingTicketReducer from './booking-ticket-reducer';
import showtimeReducer from './showtime-reducer';
import userReducer from './user-reducer';
import ticketReducer from './ticket-reducer';
import warningModalReducer from './warning-modal-reducer';

const rootReducer = combineReducers({
    movieReducer,
    branchReducer,
    theaterReducer,
    articleReducer,
    bookingTicketReducer,
    showtimeReducer,
    userReducer,
    ticketReducer,
    warningModalReducer
})

export default rootReducer;