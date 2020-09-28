import {
    getList
} from "../actionTypes";
const initialState = {
    loading: 1,
    list: [],
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
        default:
            return state;
    }
};