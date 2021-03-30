import { combineReducers } from 'redux';
import movieReducer from './movie-reducer';
import branchReducer from './branch-reducer';
import theaterReducer from './theater-reducer';

const rootReducer = combineReducers({
    movieReducer,
    branchReducer,
    theaterReducer
})

export default rootReducer;