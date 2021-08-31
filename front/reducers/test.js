import {
    getTests,
    declineOpenTest,
    componentWillUnmountTest,
    checkTransaction,
} from "../actionTypes";
import config from "../config";
const initialState = {
    loading: 1,
    tests: [],
    all: 0,
    openTestCheck: false,

    openTest: null,
    declineOpenTestLoader:false,

    checkTransactionLoader: false,
};

export default(state = initialState, action) => {
    switch (action.type) {
        case checkTransaction.REQUEST:
            return {
                ...state,
                checkTransactionLoader:true,
            };
        case checkTransaction.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    checkTransactionLoader:false,
                };
            } else {
                return {
                    ...state,
                    checkTransactionLoader:false

                };
            }
        case componentWillUnmountTest.REQUEST:
            return {
                ...state,
                loading: 1,
                tests: [],
                all: 0,
                openTestCheck: false,
                openTest: null,
                declineOpenTestLoader:false
            };
        case getTests.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getTests.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    loading: 0,
                    tests: (action.json.tests || []),
                    all: (action.json.all || 0),
                    openTest: (action.json.openTest || null),
                };
            } else {
                return {
                    ...state,
                    loading: 2,
                    tests: [],
                    all: 0,
                };
            }
        case declineOpenTest.REQUEST:
            return {
                ...state,
                declineOpenTestLoader:true
            };
        case declineOpenTest.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    openTest: null,
                    declineOpenTestLoader:false
                };
            } else {
                return {
                    ...state,
                    declineOpenTestLoader:true

                };
            }
        default:
            return state;
    }
};