import * as Actiontype from './../constants/action-type';

let initialState = {
    listUsers: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_LIST_USERS: {
            state.listUsers = action.listUsers;
            return { ...state };
        }
        default:
            return { ...state }
    }
}

export default userReducer;