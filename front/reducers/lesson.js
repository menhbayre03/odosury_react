import {
    getLesson
} from "../actionTypes";
const initialState = {
    loading: 1,
    lesson: {}
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getLesson.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getLesson.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    loading:0
                };
            } else {
                return {
                    ...state,
                    loading:2
                };
            }
        default:
            return state;
    }
};