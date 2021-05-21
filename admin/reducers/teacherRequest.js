import {
    getTeacherRequests, deleteTeacherRequests, completedTeacherRequests
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
        case deleteTeacherRequests.REQUEST:
            return {
                ...state
            }
        case deleteTeacherRequests.RESPONSE:
            if (action.json.success) {
                let a = state.requests.filter((c)=> {
                    if (c._id === action.json.id) {
                        c.status = "delete";
                    }
                    return c.status !== "delete";
                })
                return {
                    ...state,
                    requests: a
                }
            } else {
                return {
                    ...state,
                    requests: state.requests
                }
            }
        case completedTeacherRequests.REQUEST:
            return {
                ...state
            }
        case completedTeacherRequests.RESPONSE:
            return {
                ...state,
                requests: state.requests.filter((c)=> {
                    if (action.json.success && c._id === action.json.id) {
                        c.status = action.json.status
                    }
                    return c
                })
            }
        default:
            return state
    }
}