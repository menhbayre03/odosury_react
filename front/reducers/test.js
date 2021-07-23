import {
    getTests,
} from "../actionTypes";
import config from "../config";
const initialState = {
    loading: 1,
    tests: [],
    all: 0,
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getTests.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getTests.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    loading: 0,
                    tests: (action.json.tests || []),
                    all: (action.json.all || 0),
                };
            } else {
                return {
                    ...state,
                    loading: 2,
                    tests: [],
                    all: 0,
                };
            }
        default:
            return state;
    }
};