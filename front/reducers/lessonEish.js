import {
    getListEish,
} from "../actionTypes";
import config from "../config";
const initialState = {
    loading: 1,
    list: [],
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getListEish.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getListEish.RESPONSE:
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
