import {
    addWish, checkBankPayment, checkQpayPayment,
    setPayment,
} from "../actionTypes";

const initialState = {
    user: {},
    premium: false,
    eish: false,
    pendingTransactions: []
};

export default(state = initialState, action) => {
    switch (action.type) {
        case addWish.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        wish: action.json.wish || [],
                    }
                };
            } else {
                return state
            }

        case setPayment.RESPONSE:
            if(action.json.success) {
                if(state.pendingTransactions.some(item => item._id.toString() === (action.json.transaction || {})._id.toString())) {
                    let data = state.pendingTransactions.map(function (item) {
                        if(item._id.toString() === (action.json.transaction || {})._id.toString()) {
                            return action.json.transaction || {}
                        } else {
                            return item
                        }
                    });
                    return {
                        ...state,
                        pendingTransactions: data,
                    };
                } else {
                    return {
                        ...state,
                        pendingTransactions: [action.json.transaction, ...state.pendingTransactions],
                    };
                }
            } else {
                return state;
            }
        case checkBankPayment.RESPONSE:
            if(action.json.success && (action.json.transaction || {}).type === 'premium') {
                return {
                    ...state,
                    premium: true,
                };
            } else if(action.json.success && (action.json.transaction || {}).type === 'eish') {
                return {
                    ...state,
                    eish: true,
                };
            } else {
                return {
                    ...state,
                };
            }
        case checkQpayPayment.RESPONSE:
            if(action.json.success && (action.json.transaction || {}).type === 'premium') {
                return {
                    ...state,
                    premium: true,
                };
            } else if(action.json.success && (action.json.transaction || {}).type === 'eish') {
                return {
                    ...state,
                    eish: true,
                };
            } else {
                return {
                    ...state,
                };
            }
        default:
            return state;
    }
};