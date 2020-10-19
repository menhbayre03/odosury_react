import {
    getPayments,
    setPaymentStatus,
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
        case setPaymentStatus.REQUEST:
            return {
                ...state,
                transactions: state.transactions.map((c) => {
                    if(c._id === action.json.payment_id){
                        if(action.json.t === 'delete'){
                            c.deleting = true;
                        } else {
                            c.statusChanging = true;
                        }
                    }
                    return c;
                })
            };
        case setPaymentStatus.RESPONSE:
            return {
                ...state,
                transactions: state.transactions.map((c) => {
                    delete c.statusChanging;
                    delete c.deleting;
                    if(action.json.success && c._id === action.json.payment_id){
                        c.status = action.json.typo || c.status;
                        if(action.json.typo === 'delete'){
                            c = null;
                        }
                    }
                    return c;
                }).filter(a => a)
            };
        default:
            return state;
    }
};