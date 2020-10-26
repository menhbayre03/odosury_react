import {
    setCardTypes,
    getQpay,
    setBank,
    payByBank,
    lessonAddToCard,
    bundleAddToCard,
    lessonRemoveFromCard,
    bundleRemoveFromCard,
    getLessonAll,
    getBundleAll,
    removeFromCookieLesson,
    removeFromCookieBundle,
} from "../actionTypes";
const initialState = {
    type: '',
    step: 1,
    qpay: {},
    qpayPur: {},
    purchase: [],
    lessons: [],
    bundles: [],
    gettingBundles: false,
    gettingLessons: false,
    bankPaying: false,
    qloading: false
};

export default(state = initialState, action) => {
    switch (action.type) {
        case removeFromCookieLesson.REQUEST:
            return {
              ...state,
              lessons: state.lessons.filter((c) => c._id !== action.lesson)
            };
        case removeFromCookieBundle.REQUEST:
            return {
              ...state,
              bundles: state.bundles.filter((c) => c._id !== action.bundle)
            };
        case getLessonAll.REQUEST:
            return {
                ...state,
                gettingLessons: 1
            };
        case getLessonAll.RESPONSE:
            return {
                ...state,
                gettingLessons: action.json.success ? 0 : 2,
                lessons: action.json.lessons || []
            };
        case getBundleAll.REQUEST:
            return {
                ...state,
                gettingBundles: 1
            };
        case getBundleAll.RESPONSE:
            return {
                ...state,
                gettingBundles: action.json.success ? 0 : 2,
                bundles: action.json.bundles || []
            };
        case lessonAddToCard.RESPONSE:
            return {
                ...state,
                qpay: {},
                lessons: state.lessons.some(c => c._id === (action.json.lesson || {})._id) ? state.lessons : [...state.lessons, (action.json.lesson || {})]
            };
        case bundleAddToCard.RESPONSE:
            return {
                ...state,
                qpay: {},
                bundles: state.bundles.some(c => c._id === (action.json.bundle || {})._id) ? state.bundles : [...state.bundles, (action.json.bundle || {})]
            };
        case lessonRemoveFromCard.REQUEST:
            return {
                ...state,
                qpay: {},
                lessons: state.lessons.map((c) => {
                    if(c._id !== action.json._id){
                        c.deleting = true;
                    }
                    return c;
                })
            };
        case lessonRemoveFromCard.RESPONSE:
            return {
                ...state,
                qpay: {},
                lessons: state.lessons.filter((c) => c._id !== action.json._id)
            };
        case bundleRemoveFromCard.REQUEST:
            return {
                ...state,
                qpay: {},
                bundles: state.bundles.map((c) => {
                    if(c._id !== action.json._id){
                        c.deleting = true;
                    }
                    return c;
                })
            };
        case bundleRemoveFromCard.RESPONSE:
            return {
                ...state,
                qpay: {},
                bundles: state.bundles.filter((c) => c._id !== action.json._id)
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