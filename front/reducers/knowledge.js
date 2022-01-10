import {
    getKnowledge,
} from "../actionTypes";
import config from "../config";
const initialState = {
    loading: 1,
    knowledges: [],
};
export default(state = initialState, action) => {
    switch (action.type) {
        
        case getKnowledge.REQUEST:
            return {
                ...state,
                loading: 1
            };
        case getKnowledge.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    knowledges: action.json.results.knowledges || [],
                    loading: 0
                };
            } else {
                return {
                    ...state,
                    knowledges: [],
                    loading: 2
                };
            }

        default:
            return state;
    }
};