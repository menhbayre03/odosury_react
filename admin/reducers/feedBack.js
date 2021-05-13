import {
    getFeedback
} from '../actionTypes';

const initialState = {
    requests: [],
    gettingRequests: false
}

export default (state=initialState, action) => {
    switch (action.type) {
        case getFeedback.REQUEST:
            return {
                ...state,
                gettingRequests: true
            }
        case getFeedback.RESPONSE:
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