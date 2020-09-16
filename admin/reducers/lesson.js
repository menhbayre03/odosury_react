import {
    getLesson
} from "../actionTypes";
const initialState = {
    status: 1,
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getLesson.REQUEST:
            return {
                ...state,
                status: 1,
            };
        case getLesson.RESPONSE:
            return {
                ...state,
                status: 0,
            };
        default:
            return state;
    }
};