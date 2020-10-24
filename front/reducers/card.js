import {
    setCardTypes,
    getQpay,
    setBank,
    payByBank,
    lessonAddToCard,
    lessonRemoveFromCard,
} from "../actionTypes";
const initialState = {
    type: '',
    step: 1,
    qpay: {},
    qpayPur: {},
    purchase: [],
    bankPaying: false,
    qloading: false
};

export default(state = initialState, action) => {
    switch (action.type) {
        case lessonAddToCard.RESPONSE:
            return {
                ...state,
                qpay: {},
            };
        case lessonRemoveFromCard.RESPONSE:
            return {
                ...state,
                qpay: {},
            };
        case setCardTypes.REQUEST:
            return {
                ...state,
                step: action.data.step || state.step,
                type: action.data.type || state.type,
            };
        case getQpay.REQUEST:
            return {
                ...state,
                qloading: true,
                step: 3,
                type: 'q',
                qpay: {},
                qpayPur: {},
            };
        case getQpay.RESPONSE:
            return {
                ...state,
                qloading: false,
                qpay: action.json.body || {},
                qpayPur: action.json.purchase|| {},
                purchase: [...state.purchase, (action.json.purchase || {})],
            };
        case setBank.REQUEST:
            return {
                ...state,
                step: 3,
                type: 'b',
            };
        case setBank.RESPONSE:
            return {
                ...state,
                purchase: [...state.purchase, (action.json.purchase || {})]
            };
        case payByBank.REQUEST:
            return {
                ...state,
                bankPaying: true
            };
        case payByBank.RESPONSE:
            return {
                ...state,
                bankPaying: false,
                type: !action.json.success ? state.type : '',
                step: !action.json.success ? state.step : 1,
                qpay: !action.json.success ? state.qpay : {},
            };
        default:
            return state;
    }
};