import {
    getHome,
} from "../actionTypes";
const initialState = {
    loading: 1,
    watching: [],
    newLessons: [],
    featuredLessons: [],
    newAudios: [],
    bundles: [],
};

export default(state = initialState, action) => {
    switch (action.type) {
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
                    newAudios: action.json.results.newAudios || [],
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