import {
    getResults,
} from "../actionTypes";
import config from "../config";
const initialState = {
    loading: 1,
    all: 0,
    results: []
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getResults.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getResults.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    loading: 0,
                    results: (action.json.results || []),
                    all: (action.json.all || 0),
                };
            } else {
                return {
                    ...state,
                    loading: 2,
                    all: 0,
                };
            }
        default:
            return state;
    }
};