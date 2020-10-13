import {
    getList,
    getLesson,
    lessonAddToCard,
    lessonRemoveFromCard
} from "../actionTypes";
const initialState = {
    loading: 1,
    list: [],
    rating: 0,
    lessonLoading: 1,
    lesson: {},
    addingToCard: false,
    removingFromCard: false,
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
                let data = action.json.lesson || {};
                let rating = 0;
                if((data.rating || []).length > 0) {
                    rating = data.rating.reduce((total, rate) => (total + rate.rate), 0) / data.rating.length
                }
                return {
                    ...state,
                    lesson: data || {},
                    rating: rating || 0,
                    lessonLoading:0
                };
            } else {
                return {
                    ...state,
                    lesson: {},
                    rating: 0,
                    lessonLoading:2
                };
            }
        case lessonAddToCard.REQUEST:
            return {
                ...state,
                addingToCard: true
            };
        case lessonAddToCard.RESPONSE:
            return {
                ...state,
                addingToCard: false
            };
        case lessonRemoveFromCard.REQUEST:
            return {
                ...state,
                removingFromCard: true
            };
        case lessonRemoveFromCard.RESPONSE:
            return {
                ...state,
                removingFromCard: false
            };
        default:
            return state;
    }
};