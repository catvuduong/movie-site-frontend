import * as ActionType from './../constants/action-type';
import axios from 'axios';

export const actGetListMovieAPI = data => {
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
export const actGetListBranchesAPI = () => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: "https://localhost:5001/branches/get-list"
        })
        dispatch({
            type: ActionType.GET_LIST_BRANCHES,
            litsBranches: result.data
        })
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
        window.location.reload();
    }
}


