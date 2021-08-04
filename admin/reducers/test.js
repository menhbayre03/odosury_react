import config from '../config';
import {
    createTest,
    deleteTest,
    getTest,
    getTests,
    createQuestion,
    deleteQuestion,
    publishQuestion,
    unpublishQuestion
} from "../actionTypes";
const initialState = {
    questions: [],
    tests: [],
    gettingTest: false,
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getTest.REQUEST:
            return {
                ...state,
            }
        case getTest.RESPONSE:
            config.get('emitter').emit('testSingleGetTest',
                {
                    test: ((action.json || {}).test),
                    questions: ((action.json || {}).questions),
                    success: (action.json || {}).success,
                });
            return {
                ...state,
            }
        case getTests.REQUEST:
            return {
                ...state,
                gettingTest: false,
            }
        case getTests.RESPONSE:
            return {
                ...state,
                gettingTest: false,
                tests: ((action.json || {}).tests || [])
            }
        default:
            return state;
    }
};