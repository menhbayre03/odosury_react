import {
    getHistory,
    getLessonsProf,
    getWishlist,
    addWish
} from "../actionTypes";
import moment from 'moment';
const initialState = {
    histories: [],
    loadingHistory: false,
    loadingLessons: false,
    loadingWishlist: false,
    wishlist: [],
    wishRemoveLoading: false,
    lessons: [],
    bundles: [],
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
                    loadingHistory:false,
                    histories: [],
                };
            }
        case addWish.REQUEST:
            return {
                ...state,
                wishRemoveLoading:true
            };
        case addWish.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    wishlist: state.wishlist.filter(aa => action.json.wish.some(bb => bb == aa._id)),
                    wishRemoveLoading:false
                };
            } else {
                return {
                    ...state,
                    wishRemoveLoading:false
                }
            }
        case getLessonsProf.REQUEST:
            return {
                ...state,
                loadingLessons:true
            };
        case getLessonsProf.RESPONSE:
            if(action.json.success) {
                let bb = (action.json.bundles || []).sort((a, b) => moment(b.trans_date) - moment(a.trans_date));
                let aa = (action.json.lessons || []).sort((a, b) => moment(b.trans_date) - moment(a.trans_date));
                return {
                    ...state,
                    lessons: aa || [],
                    bundles: bb || [],
                    loadingLessons:false
                };
            } else {
                return {
                    ...state,
                    loadingLessons:false,
                    lessons: [],
                    bundles: [],
                };
            }
        case getWishlist.REQUEST:
            return {
                ...state,
                loadingWishlist:true
            };
        case getWishlist.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    wishlist: action.json.wishlist || [],
                    loadingWishlist:false
                };
            } else {
                return {
                    ...state,
                    loadingWishlist:false,
                    wishlist: [],
                };
            }
        default:
            return state;
    }
};