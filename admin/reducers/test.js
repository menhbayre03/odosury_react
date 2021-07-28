import {
    createTest,
    deleteTest,
    getTest
} from "../actionTypes";
const initialState = {
    tests: [],
    gettingTest: false,

};

export default(state = initialState, action) => {
    switch (action.type) {
        case getTest.REQUEST:
            return {
                ...state,
                gettingTest: true
            }
        case getTest.RESPONSE:
            return {
                ...state,
                gettingTest: false,
                tests: ((action.json || {}).tests)
            }
        case createTest.REQUEST:
            return {
                ...state,
                gettingTest: true,
            }
        case createTest.RESPONSE:
            if((action.json || {}).success){
                return {
                    ...state,
                    gettingTest: false,
                    tests: [((action.json || {}).tests), ...state.tests]
                }
            }else{
                return {
                    ...state,
                    gettingTest: false
                }
            }
        case deleteTest.REQUEST:
            return {
                ...state,
                gettingTest: true,
            }
        case deleteTest.RESPONSE:
            if((action.json || {}).success){
                return {
                    ...state,
                    gettingTest: false,
                    tests: (state.tests || []).filter(test => (test._id || 'as').toString() !== ((action.json || {})._id || '').toString())
                }
            }else{
                return {
                    ...state,
                    gettingTest: false
                }
            }
        default:
            return state;
    }
};