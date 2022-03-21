import * as Actiontype from './../constants/action-type';

let initialState = {
    warningInfo: {
        status: null
    }
}

const warningModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actiontype.GET_WARNING_INFO: {
            state.warningInfo = action.warningInfo
            return { ...state };
        }
        case Actiontype.CLEAR_WARNING_INFO: {
            return { ...state, warningInfo: { status: null } }
        }
        default:
            return { ...state }
    }
}

export default warningModalReducer;