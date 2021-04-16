import * as Actiontype from './../constants/action-type';

let initialState = {
    listArticles: [],
}

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_LIST_ARTICLES: {
            state.listArticles = action.listArticles;
            return { ...state };
        }
        default:
            return { ...state }
    }
}

export default articleReducer;