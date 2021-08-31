import config from '../config';
import {
    createTest,
    deleteTest,
    getTest,
    getTests,
    createQuestion,
    deleteQuestion,
    publishQuestion,
    unpublishQuestion,
    chooseTestMedia,
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
        // case chooseTestMedia.REQUEST:
        //     console.log(action.json);
        //     if((action.json || {}).forWhat === 'testModalImage'){
        //         return {
        //             ...state,
        //             modalImage: action.json.data[0]
        //         };
        //     }else{
        //         return {
        //             ...state,
        //             cardImage: action.json.data[0]
        //         };
        //     }
        case chooseTestMedia.REQUEST:
            return {
                ...state,
            }
        default:
            return state;
    }
};