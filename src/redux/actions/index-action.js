import * as ActionType from './../constants/action-type';
import axios from 'axios';
import { toast } from 'react-toastify';

export const actGetListMoviesAPI = data => {
    return async dispatch => {
        let result = await axios({
            method: "GET",
            url: "/movies/get-list",
        });
        dispatch({
            type: ActionType.GET_LIST_MOVIES,
            listMovies: result.data
        })
    };
};

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
            warningInfo: { status },
        })
    }
}

export const actSendingShowTimeID = showtimeId => {
    return async dispatch => {
        dispatch({
            type: ActionType.MOVE_TO_BOOKING_BYSHOWTIMEID,
            showtimeId
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
            } else if (condi === 'loginAtCinema') {
                if (resp.data.role === 0) {
                    localStorage.setItem('Admin', JSON.stringify(resp.data));
                    return dispatch(actWarningBox('Login successfully at cinema'));
                } else {
                    localStorage.setItem('User', JSON.stringify(resp.data));
                    return dispatch(actWarningBox('Login successfully at cinema'));
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
            toast.success("Đăng ký thành công", {
                theme: "colored"
            });
        }
        catch (err) {
            alert(err.response.data.message);
            toast.error(err.response.data.message, {
                theme: "colored"
            });
        }
    }
}

export const actBranchManagement = (branch, type) => {
    return async () => {
        try {
            if (branch.id) {
                switch (type) {
                    case "edit": {
                        await axios.put(`/branches/update/${branch.id}`, branch);
                        toast.success("Update successfully", {
                            theme: "colored"
                        });
                        break;
                    }
                    case "branch_delete": {
                        await axios.delete(`/branches/delete/${branch.id}`);
                        toast.success("Delete successfully", {
                            theme: "colored"
                        });
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('/branches/create', branch);
                toast.success("Add successfully", {
                    theme: "colored"
                });
            }
        } catch (err) {
            toast.error(err.response.data.message, {
                theme: "colored"
            });
        }
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
                        toast.success("Update successfully", {
                            theme: "colored"
                        });
                        break;
                    }
                    case "delete": {
                        await axios.delete(`/theaters/delete/${theater.id}`);
                        toast.success("Delete successfully", {
                            theme: "colored"
                        });
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('/theaters/create', theater);
                toast.success("Add successfully", {
                    theme: "colored"
                });
            }
        } catch (err) {
            toast.error(err.response.data.message, {
                theme: "colored"
            });
        }
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
                        toast.success("Update successfully", {
                            theme: "colored"
                        });
                        break;
                    }
                    case "delete": {
                        await axios.delete(`/movies/delete/${movie.id}`);
                        toast.success("Delete successfully", {
                            theme: "colored"
                        });
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('/movies/create', movie);
                toast.success("Add successfully", {
                    theme: "colored"
                });
            }
        } catch (err) {
            toast.error(err.response.data.message, {
                theme: "colored"
            });
        }
    }
}

export const actShowtimeManagement = (showtime, type) => {
    return async () => {
        try {
            if (showtime.id) {
                switch (type) {
                    case "edit": {
                        await axios.put(`/showtimes/update/${showtime.id}`, showtime);
                        toast.success("Update successfully", {
                            theme: "colored"
                        });
                        break;
                    }
                    case "delete": {
                        await axios.delete(`/showtimes/delete/${showtime.id}`);
                        toast.success("Delete successfully", {
                            theme: "colored"
                        });
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('/showtimes/create', showtime);
                toast.success("Add successfully", {
                    theme: "colored"
                });
            }
        } catch (err) {
            toast.error(err.response.data.message, {
                theme: "colored"
            });
        }
    }
}

export const actArticleManagement = (article, type) => {
    return async () => {
        try {
            if (article.id) {
                switch (type) {
                    case "edit": {
                        await axios.put(`/articles/update/${article.id}`, article);
                        toast.success("Update successfully", {
                            theme: "colored"
                        });
                        break;
                    }
                    case "delete": {
                        await axios.delete(`/articles/delete/${article.id}`);
                        toast.success("Delete successfully", {
                            theme: "colored"
                        });
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('/articles/create', article);
                toast.success("Add successfully", {
                    theme: "colored"
                });
            }
        } catch (err) {
            toast.error(err.response.data.message, {
                theme: "colored"
            });
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
                        toast.success("Update successfully", {
                            theme: "colored"
                        });
                        break;
                    }
                    case "user_delete": {
                        await axios.delete(`/users/delete/${user.id}`);
                        toast.success("Delete successfully", {
                            theme: "colored"
                        });
                        break;
                    }
                    default:
                        break;
                }
            } else {
                await axios.post('/users/register', user);
                toast.success("Add successfully", {
                    theme: "colored"
                });
            }
        } catch (err) {
            toast.error(err.response.data.message, {
                theme: "colored"
            })
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
                        toast.success("Delete successfully", {
                            theme: "colored"
                        });
                        break;
                    }
                    default:
                        break;
                }
            }
        } catch (err) {
            toast.error(err.response.data.message, {
                theme: "colored"
            });
        }
    }
}






