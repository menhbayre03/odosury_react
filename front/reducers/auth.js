import {
    register,
    login
} from "../actionTypes";
const initialState = {
    registerLoading: false,
    loginLoading: false,
};

export default(state = initialState, action) => {
    switch (action.type) {
        case register.REQUEST:
            return {
                ...state,
                registerLoading:true
            };
        case register.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    registerLoading:false
                };
            } else {
                return {
                    ...state,
                    registerLoading:false
                };
            }
        case login.REQUEST:
            return {
                ...state,
                loginLoading:true
            };
        case login.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    loginLoading:false
                };
            } else {
                return {
                    ...state,
                    loginLoading:false
                };
            }
        default:
            return state;
    }
};