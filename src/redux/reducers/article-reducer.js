import * as Actiontype from './../constants/action-type';

let initialState = {
    listArticles: [],
    expandList: []
}

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_LIST_ARTICLES: {
            state.listArticles = action.listArticles;
            return { ...state };
        }
        case Actiontype.SIGN_EXPAND: {
            state.expandList.push(action.list);
            return { ...state };
        }
        case Actiontype.DELETE_SIGN: {
            state.expandList = []
            return { ...state };
        }
        default:
            return { ...state }
    }
}

export default articleReducer;