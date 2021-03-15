import * as Actiontype from './../constants/action-type';

let initialState = {
    litsBranches: [],
}

const branchReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_LIST_BRANCHES: {
            state.litsBranches = action.litsBranches;
            return { ...state };
        }
        default:
            return { ...state }
    }
}

export default branchReducer;