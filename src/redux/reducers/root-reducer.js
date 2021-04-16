import { combineReducers } from 'redux';
import movieReducer from './movie-reducer';
import branchReducer from './branch-reducer';
import theaterReducer from './theater-reducer';
import articleReducer from './article-reducer';

const rootReducer = combineReducers({
    movieReducer,
    branchReducer,
    theaterReducer,
    articleReducer
})

export default rootReducer;