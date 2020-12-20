import * as ActionType from './../constants/action-type';
import axios from 'axios';

export const actGetListMovieAPI = (data) => {
    // OBJECT - ACTION
    // return {
    //     type: ActionType.GET_LIST_MOVIE,
    //     listMovie
    // }

    // FUNCTION
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: "https://localhost:5001/movies/get-list",
        });
        // console.log(result);
        dispatch({
            type: ActionType.GET_LIST_MOVIE,
            listMovie: result.data
        })
    };
};
