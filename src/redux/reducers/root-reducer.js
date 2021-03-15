import { combineReducers } from 'redux';
import movieReducer from './movie-reducer';
import branchReducer from './branch-reducer';

const rootReducer = combineReducers({
    movieReducer,
    branchReducer,
})

export default rootReducer;