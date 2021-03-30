import * as Actiontype from './../constants/action-type';

let initialState = {
    listTheaters: [],
}

const branchReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_LIST_THEATERS: {
            state.listTheaters = action.listTheaters;
            return { ...state };
        }
        default:
            return { ...state }
    }
}

export default branchReducer;