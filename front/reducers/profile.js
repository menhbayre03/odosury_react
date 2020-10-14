import {
    getHistory,
} from "../actionTypes";
const initialState = {
    histories: [],
    loadingHistory: false,
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getHistory.REQUEST:
            return {
                ...state,
                loadingHistory:true
            };
        case getHistory.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    histories: action.json.histories || [],
                    loadingHistory:false
                };
            } else {
                return {
                    ...state,
                    loadingHistory:false
                };
            }
        default:
            return state;
    }
};