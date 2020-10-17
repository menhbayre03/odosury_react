import {
    lessonAddToCard,
    lessonRemoveFromCard,
    bundleAddToCard,
    bundleRemoveFromCard,
    payByBank,
} from "../actionTypes";

const initialState = {
    user: {},
};

export default(state = initialState, action) => {
    switch (action.type) {
        case lessonAddToCard.RESPONSE:
            return {
              ...state,
                user: action.json.user || {
                    ...state.user
                }
            };
        case lessonRemoveFromCard.REQUEST:
            return {
              ...state,
              user: {
                  ...state.user,
                  lessons: (state.user.lessons || []).map((c) => {
                      if(c._id === action.json._id){
                          c.deleting = true;
                      }
                      return c;
                  })
              }
            };
        case lessonRemoveFromCard.RESPONSE:
            return {
              ...state,
              user: action.json.user || {
                  ...state.user
              }
            };
        case bundleAddToCard.RESPONSE:
            return {
              ...state,
                user: action.json.user || {
                    ...state.user
                }
            };
        case bundleRemoveFromCard.REQUEST:
            return {
              ...state,
              user: {
                  ...state.user,
                  bundles: (state.user.bundles || []).map((c) => {
                      if(c._id === action.json._id){
                          c.deleting = true;
                      }
                      return c;
                  })
              }
            };
        case bundleRemoveFromCard.RESPONSE:
            return {
              ...state,
              user: action.json.user || {
                  ...state.user
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
        default:
            return state;
    }
};