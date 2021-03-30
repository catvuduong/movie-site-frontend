import * as Actiontype from './../constants/action-type';

let initialState = {
    listBranches: [],
}

const branchReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_LIST_BRANCHES: {
            state.listBranches = action.listBranches;
            return { ...state };
        }
        default:
            return { ...state }
    }
}

export default branchReducer;