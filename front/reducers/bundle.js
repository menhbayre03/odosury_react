import {
    getBundle
} from "../actionTypes";
const initialState = {
    loading: 1,
    bundle: {},
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getBundle.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getBundle.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    bundle: action.json.result || {},
                    loading:0
                };
            } else {
                return {
                    ...state,
                    bundle: {},
                    loading:2
                };
            }
        default:
            return state;
    }
};