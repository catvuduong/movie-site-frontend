import * as ActionType from './../constants/action-type';
import axios from 'axios';

export const actGetListMoviesAPI = data => {
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
            type: ActionType.GET_LIST_MOVIES,
            listMovies: result.data
        })
    };
};

export const actGetListBranchesAPI = () => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: "https://localhost:5001/branches/get-list"
        })
        dispatch({
            type: ActionType.GET_LIST_BRANCHES,
            listBranches: result.data
        })
    }
}


export const actGetDetailsMovie = id => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: `https://localhost:5001/movies/get/${id}`
        })
        dispatch({
            type: ActionType.GET_DETAILS_MOVIE,
            movie: result.data
        })
    }
}


export const actGetListTheatersAPI = () => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: "https://localhost:5001/theaters/get-list"
        })
        dispatch({
            type: ActionType.GET_LIST_THEATERS,
            listTheaters: result.data
        })
        // console.log("theater");
    }
}

export const actLogin = (user, history) => {
    return async () => {
        try {
            const resp = await axios.post('https://localhost:5001/users/login', user);
            // console.log(resp.data);
            if (resp.data.role === 0) {
                localStorage.setItem('Admin', JSON.stringify(resp.data));
                alert("Login success");
                history.push('/dash-board');
            } else {
                alert("Login failure, you are not admin");
            }

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
}

export const actBranchManagement = (branch, type) => {
    // console.log(branch, type);
    return async () => {
        try {
            if (branch.id) {
                switch (type) {
                    case "edit": {
                        await axios.put(`https://localhost:5001/branches/update/${branch.id}`, branch);
                        alert("Update success");
                        break;
                    }
                    case "delete": {
                        await axios.delete(`https://localhost:5001/branches/delete/${branch.id}`);
                        alert("Delete success");
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('https://localhost:5001/branches/create', branch);
                alert("Add success");
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
        // window.location.reload();
    }
}

export const actTheaterManagement = (theater, type) => {
    console.log(theater, type);
    return async () => {
        try {
            if (theater.id) {
                switch (type) {
                    case "edit": {
                        await axios.put(`https://localhost:5001/theaters/update/${theater.id}`, theater);
                        // alert("Update success");
                        break;
                    }
                    case "delete": {
                        await axios.delete(`https://localhost:5001/theaters/delete/${theater.id}`);
                        alert("Delete success");
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('https://localhost:5001/theaters/create', theater);
                alert("Add success");
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
        // window.location.reload();
    }
}


