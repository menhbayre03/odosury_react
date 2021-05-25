import {
    getPayments, searchUser,
    setPaymentStatus,
    changeHandlerPaymentUser,
    openModalTrans,
    onCancelTrans,
    onSaveTrans
} from "../actionTypes";
const initialState = {
    status: 1,
    pageNum: 1,
    all: 0,
    transactions: [],
    searchLoader: false,
    searchResult: [],
    item: {
        type: '',
        user: '',
        description: ''
    },
    submitTransLoader: false,
    openModal: false
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getPayments.REQUEST:
            return {
                ...state,
                status: 1,
                pageNum: parseInt((action.json.skip / 50 + 1) || 1),
            };
        case getPayments.RESPONSE:
            return {
                ...state,
                status: action.json.success ? 0 : 2,
                transactions: (action.json.trans || []).map((c, i) => {
                    c.key = i + 1;
                    return c;
                }),
                all: action.json.all || state.all
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
            if(action.json.success) {
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
            } else {
                return {
                    ...state,
                };
            }
        case changeHandlerPaymentUser.REQUEST:
            return {
                ...state,
                item: {
                    ...state.item,
                    [action.data.name]: action.data.value
                }
            };
        case searchUser.REQUEST:
            return {
                ...state,
                searchLoader: true
            };
        case onCancelTrans.REQUEST:
            return {
                ...state,
                openModal: false,
                item: {
                    type: '',
                    user: '',
                    description: ''
                }
            };
        case openModalTrans.REQUEST:
            return {
                ...state,
                openModal: true
            };
        case onSaveTrans.REQUEST:
            return {
                ...state,
                submitTransLoader: true
            };
        case onSaveTrans.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    openModal: false,
                    submitTransLoader: false,
                    item: {
                        type: '',
                        user: '',
                        description: ''
                    },
                    transactions: [
                        action.json.data,
                        ...state.transactions
                    ]
                };
            } else {
                return {
                    ...state,
                    openModal: true,
                    submitTransLoader: false
                };
            }
        case searchUser.RESPONSE:
            return {
                ...state,
                searchLoader: false,
                searchResult: (action.json.users || [])
            };
        default:
            return state;
    }
};