import * as Actiontype from './../constants/action-type';

let initialState = {
    warningInfo: {
        status: null
    },
    completeInfo: ''
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
        case Actiontype.SEND_COMPLETE_INFO: {
            return { ...state, completeInfo: action.info }
        }
        default:
            return { ...state }
    }
}

export default warningModalReducer;