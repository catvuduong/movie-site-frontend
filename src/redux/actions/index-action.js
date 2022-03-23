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
            url: "/movies/get-list",
        });
        // console.log(result);
        dispatch({
            type: ActionType.GET_LIST_MOVIES,
            listMovies: result.data
        })
    };
};

//Get detail by id

export const actGetDetailsMovie = id => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: `/movies/get/${id}`
        })
        dispatch({
            type: ActionType.GET_DETAILS_MOVIE,
            movie: result.data
        })
    }
}

export const actGetDetailsTheater = id => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: `/theaters/get/${id}`
        })
        dispatch({
            type: ActionType.GET_DETAIL_THEATER,
            theater: result.data
        })
    }
}


export const actGetShowtimeByID = id => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: `/showtimes/get/${id}`
        })
        dispatch({
            type: ActionType.GET_SHOWTIME_BYID,
            showtime: result.data
        })
    }
}

export const actGetListBranchesAPI = () => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: "/branches/get-list"
        })
        dispatch({
            type: ActionType.GET_LIST_BRANCHES,
            listBranches: result.data
        })
    }
}


export const actGetListTheatersAPI = () => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: "/theaters/get-list"
        })
        dispatch({
            type: ActionType.GET_LIST_THEATERS,
            listTheaters: result.data
        })
    }
}

export const actWarningBox = status => {
    return async dispatch => {
        dispatch({
            type: ActionType.GET_WARNING_INFO,
            warningInfo: { status }
        })
    }
}


export const actGetListUsersAPI = () => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: "/users/get-list"
        })
        dispatch({
            type: ActionType.GET_LIST_USERS,
            listUsers: result.data
        })
    }
}

export const actGetListArticlesAPI = () => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: "/articles/get-list"
        })
        dispatch({
            type: ActionType.GET_LIST_ARTICLES,
            listArticles: result.data
        })
    }
}


export const actGetListShowtimesAPI = () => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: "/showtimes/get-list"
        })
        dispatch({
            type: ActionType.GET_LIST_SHOWTIMES,
            listShowtimes: result.data
        })
    }
}

export const actGetListTheatersByBranchIdAPI = () => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: "/theaters/get-list"
        })
        dispatch({
            type: ActionType.GET_LIST_THEATERS,
            listTheaters: result.data
        })
        // console.log("theater");
    }
}



export const actLogin = (user, condi) => {
    return async dispatch => {
        try {
            const resp = await axios.post('/users/login', user);
            if (condi === "loginHomePage") {
                if (resp.data.role === 0) {
                    localStorage.setItem('Admin', JSON.stringify(resp.data));
                    return dispatch(actWarningBox('Login successfully'));
                } else {
                    localStorage.setItem('User', JSON.stringify(resp.data));
                    return dispatch(actWarningBox('Login successfully'));
                }
            }
            else if (condi !== "loginHomePage" && resp.data.role === 0) {
                localStorage.setItem('Admin', JSON.stringify(resp.data));
                await dispatch(actWarningBox('Login successfully'));
            }
        } catch (err) {
            // Handle Error Here
            return dispatch(actWarningBox('Login failed'));
            // alert(err.response.data.message);
        }
    }
}

export const actRegister = (user) => {
    return async () => {
        try {
            await axios.post('/users/register', user);
            alert("Register successfull !!!")
        }
        catch (err) {
            alert(err.response.data.message);
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
                        await axios.put(`/branches/update/${branch.id}`, branch);
                        alert("Update success");
                        break;
                    }
                    case "delete": {
                        await axios.delete(`/branches/delete/${branch.id}`);
                        alert("Delete success");
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('/branches/create', branch);
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
                        await axios.put(`/theaters/update/${theater.id}`, theater);
                        // alert("Update success");
                        break;
                    }
                    case "delete": {
                        await axios.delete(`/theaters/delete/${theater.id}`);
                        alert("Delete success");
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('/theaters/create', theater);
                alert("Add success");
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
        // window.location.reload();
    }
}

export const actMovieManagement = (movie, type) => {
    console.log(movie, type);
    return async () => {
        try {
            if (movie.id) {
                switch (type) {
                    case "edit": {
                        await axios.put(`/movies/update/${movie.id}`, movie);
                        // alert("Update success");
                        break;
                    }
                    case "delete": {
                        await axios.delete(`/movies/delete/${movie.id}`);
                        alert("Delete success");
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('/movies/create', movie);
                alert("Add success");
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
        // window.location.reload();
    }
}

export const actShowtimeManagement = (showtime, type) => {
    console.log(showtime, type);
    return async () => {
        try {
            if (showtime.id) {
                switch (type) {
                    case "edit": {
                        await axios.put(`/showtimes/update/${showtime.id}`, showtime);
                        alert("Update success");
                        break;
                    }
                    case "delete": {
                        await axios.delete(`/showtimes/delete/${showtime.id}`);
                        alert("Delete success");
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('/showtimes/create', showtime);
                alert("Add success");
            }
        } catch (err) {
            console.error(err);
        }
    }
}

export const actArticleManagement = (article, type) => {
    // console.log(article, type);
    return async () => {
        try {
            if (article.id) {
                switch (type) {
                    case "edit": {
                        await axios.put(`/articles/update/${article.id}`, article);
                        alert("Update success");
                        break;
                    }
                    case "delete": {
                        await axios.delete(`/articles/delete/${article.id}`);
                        alert("Delete success");
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('/articles/create', article);
                alert("Add success");
            }
        } catch (err) {
            console.error(err);
        }
    }
}


export const actUserManagement = (user, type) => {
    // console.log(user, type);
    return async () => {
        try {
            if (user.id) {
                switch (type) {
                    case "edit": {
                        await axios.put(`/users/update/${user.id}`, user);
                        alert("Update success");
                        break;
                    }
                    case "delete": {
                        await axios.delete(`/users/delete/${user.id}`);
                        alert("Delete success");
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('/users/register', user);
                alert("Add success");
            }
        } catch (err) {
            console.error(err);
        }
    }
}

export const actBookTicket = (tickets, showtimeId) => {
    return async dispatch => {
        try {
            await axios.post('/tickets/book-ticket', { tickets, showtimeId });
            await dispatch(actWarningBox('Book successfully'));
        } catch (err) {
            alert(err.response.data);
        }
    }
}

export const actGetListTicketsAPI = () => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: "/tickets/get-list"
        })
        dispatch({
            type: ActionType.GET_LIST_TICKETS,
            listTickets: result.data
        })
    }
}


export const actTicketManagement = (ticket, type) => {
    // console.log(user, type);
    return async () => {
        try {
            if (ticket.id) {
                switch (type) {
                    // case "edit": {
                    //     await axios.put(`/users/update/${ticket.id}`, ticket);
                    //     alert("Update success");
                    //     break;
                    // } 
                    case "delete": {
                        await axios.delete(`/tickets/delete/${ticket.id}`);
                        alert("Delete success");
                        break;
                    }
                    default:
                        break;
                }
            } else {
                // await axios.post('/users/register', user);
                // alert("Add success");
            }
        } catch (err) {
            console.error(err.response.data.message);
        }
    }
}






