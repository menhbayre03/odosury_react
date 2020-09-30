import {
    getList,
    getLesson
} from "../actionTypes";
const initialState = {
    loading: 1,
    list: [],
    lessonLoading: 1,
    lesson: {},
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getList.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getList.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    list: action.json.results.list || [],
                    loading:0
                };
            } else {
                return {
                    ...state,
                    list: [],
                    loading:2
                };
            }
        case getLesson.REQUEST:
            return {
                ...state,
                lessonLoading:1
            };
        case getLesson.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    lesson: action.json.lesson || {},
                    lessonLoading:0
                };
            } else {
                return {
                    ...state,
                    lesson: {},
                    lessonLoading:2
                };
            }
        default:
            return state;
    }
};