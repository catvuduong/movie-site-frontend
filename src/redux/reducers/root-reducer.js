import { combineReducers } from 'redux';
import movieReducer from './movie-reducer';
import branchReducer from './branch-reducer';
import theaterReducer from './theater-reducer';
import articleReducer from './article-reducer';
import bookingTicketReducer from './booking-ticket-reducer';
import showtimeReducer from './showtime-reducer';

const rootReducer = combineReducers({
    movieReducer,
    branchReducer,
    theaterReducer,
    articleReducer,
    bookingTicketReducer,
    showtimeReducer
})

export default rootReducer;