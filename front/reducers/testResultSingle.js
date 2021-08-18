import {
    getTestSingle,
} from "../actionTypes";
import config from "../config";
const initialState = {
    loading: 1,
    result: {}
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getTestSingle.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getTestSingle.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    loading: 0,
                    openTest: (action.json.openTest || {}),
                };
            } else {
                window.location.assign('/test/results');
            }
        default:
            return state;
    }
};