import {
    getHome,
    setPremiumModal,
    setBankForPremium,
    setQpayForPremium,
    checkQpayForPremium,
} from "../actionTypes";
const initialState = {
    loading: 1,
    watching: [],
    newLessons: [],
    featuredLessons: [],
    bundles: [],
    premiumModal: {
        visible: false,
        gettingTransaction: false,
        checkingQpay: false,
        transaction: {},
        step: 1,
        type: ''
    }
};

export default(state = initialState, action) => {
    switch (action.type) {
        case checkQpayForPremium.REQUEST:
            return {
                ...state,
                premiumModal: {
                    ...state.premiumModal,
                    checkingQpay: true
                }
            };
        case checkQpayForPremium.RESPONSE:
            return {
                ...state,
                premiumModal: {
                    ...state.premiumModal,
                    checkingQpay: false
                }
            };
        case setQpayForPremium.REQUEST:
            return {
                ...state,
                premiumModal: {
                    ...state.premiumModal,
                    gettingTransaction: true,
                    type: 'qpay'
                }
            };
        case setQpayForPremium.RESPONSE:
            return {
                ...state,
                premiumModal: {
                    ...state.premiumModal,
                    gettingTransaction: false,
                    transaction: action.json.transaction || {}
                }
            };
        case setBankForPremium.REQUEST:
            return {
                ...state,
                premiumModal: {
                    ...state.premiumModal,
                    gettingTransaction: true
                }
            };
        case setBankForPremium.RESPONSE:
            return {
                ...state,
                premiumModal: {
                    ...state.premiumModal,
                    gettingTransaction: false,
                    transaction: action.json.transaction || {}
                }
            };
        case setPremiumModal.REQUEST:
            return {
                ...state,
                premiumModal: {
                    ...state.premiumModal,
                    ...action.data
                }
            };
        case getHome.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getHome.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    watching: action.json.results.watching || [],
                    newLessons: action.json.results.newLessons || [],
                    featuredLessons: action.json.results.featuredLessons || [],
                    bundles: action.json.results.bundles || [],
                    loading:0
                };
            } else {
                return {
                    ...state,
                    loading:2
                };
            }
        default:
            return state;
    }
};