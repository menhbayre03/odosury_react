import {
    getTeacherRequests
} from '../actionTypes';

const initialState = {
    requests: [],
    gettingRequests: false
}

export default (state=initialState, action) => {
    switch (action.type) {
        case getTeacherRequests.REQUEST:
            return {
                ...state,
                gettingRequests: true
            }
        case getTeacherRequests.RESPONSE:
            if (action.json.success) {
                return {
                    ...state,
                    requests: action.json.requests,
                    gettingRequests: false
                }
            } else {
                return {
                    ...state,
                    gettingRequests: false
                }
            }
    
        default:
            return state
    }
}