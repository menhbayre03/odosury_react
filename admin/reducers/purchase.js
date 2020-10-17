import {
    getPayments
} from "../actionTypes";
const initialState = {
    status: 1,
    transactions: []
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getPayments.REQUEST:
            return {
                ...state,
                status: 1,
            };
        case getPayments.RESPONSE:
            return {
                ...state,
                status: action.json.success ? 0 : 2,
                transactions: action.json.trans || []
            };
        default:
            return state;
    }
};