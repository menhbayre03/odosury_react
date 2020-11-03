import {
    lessonAddToCard,
    lessonRemoveFromCard,
    bundleAddToCard,
    bundleRemoveFromCard,
    payByBank,
    addWish,
} from "../actionTypes";

const initialState = {
    user: {},
};

export default(state = initialState, action) => {
    switch (action.type) {
        case lessonAddToCard.RESPONSE:
            return {
              ...state,
                user: {
                    ...state.user,
                    lessons: (state.user.lessons || []).indexOf((action.json.lesson || {})._id) === -1 ? [...(state.user.lessons || []), (action.json.lesson || {})._id] : (state.user.lessons || [])
                }
            };
        case lessonRemoveFromCard.RESPONSE:
            return {
              ...state,
              user: {
                  ...state.user,
                  lessons: (state.user.lessons || []).filter((c) => c !== action.json._id)
              }
            };
        case bundleAddToCard.RESPONSE:
            return {
              ...state,
                user: {
                  ...state.user,
                    bundles: (state.user.bundles || []).indexOf((action.json.bundle || {})._id) === -1 ? [...(state.user.bundles || []), (action.json.bundle || {})._id] : (state.user.bundles || [])
                }
            };
        case bundleRemoveFromCard.RESPONSE:
            return {
              ...state,
              user: {
                  ...state.user,
                  bundles: (state.user.bundles || []).filter((c) => c !== action.json._id)
              }
            };
        case payByBank.RESPONSE:
            return {
              ...state,
              user: {
                  ...state.user,
                  bundles: [],
                  lessons: []
              }
            };
        case addWish.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        wish: action.json.wish ||[],
                    }
                };
            } else {
                return state
            }
        default:
            return state;
    }
};