import {
    getBundle, bundleAddToCard, bundleRemoveFromCard
} from "../actionTypes";
const initialState = {
    loading: 1,
    bundle: {},
    addingToCard: false,
    removingFromCard: false,
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
        case bundleAddToCard.REQUEST:
            return {
                ...state,
                addingToCard: true
            };
        case bundleAddToCard.RESPONSE:
            return {
                ...state,
                addingToCard: false
            };
        case bundleRemoveFromCard.REQUEST:
            return {
                ...state,
                removingFromCard: true
            };
        case bundleRemoveFromCard.RESPONSE:
            return {
                ...state,
                removingFromCard: false
            };
        default:
            return state;
    }
};