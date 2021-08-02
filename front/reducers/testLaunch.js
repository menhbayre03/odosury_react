import {
    getTest,
} from "../actionTypes";
import config from "../config";
const initialState = {
    loading: 1,
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getTest.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getTest.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    loading: 0,
                    openTest: (action.json.openTest || {}),
                };
            } else {
                window.location.assign('/test');
            }
        default:
            return state;
    }
};