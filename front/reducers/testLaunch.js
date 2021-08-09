import {
    getTest,
    selectedAnswer,
    postAnswers
} from "../actionTypes";
import config from "../config";
const initialState = {
    loading: 1,
    openTest: {}
};

export default(state = initialState, action) => {
    switch (action.type) {
        case getTest.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getTest.RESPONSE:
            if(action.json.success) {
                config.get('emitter').emit('testSingleGetSeconds',
                {
                    success: true,
                    timer: (((action.json || {}).openTest || {}).leftSeconds)
                });
                return {
                    ...state,
                    loading: 0,
                    openTest: (action.json.openTest || {}),
                };
            } else {
                window.location.assign('/test');
            }
        case selectedAnswer.REQUEST:
            return {
                ...state,
                openTest: {
                    ...state.openTest,
                    questions: (state.openTest?.questions || []).map(question => {
                        if((question._id || '').toString() !== (action.json?.question_id || 'as').toString()){
                            return question;
                        }
                        return {
                            
                            ...question,
                            answer: action.json?.answer_id
                        }
                    })
                }
            }
        case postAnswers.REQUEST:
            return {
                ...state,
            }
        case postAnswers.RESPONSE:
            if(action.json?.success){
                return {
                    ...state,
                    openTest: {
                        ...state.openTest,
                        questions: (state.openTest?.questions || []).map(question => {
                            if((question._id || '').toString() !== (action.json?.question_id || 'as').toString()){
                                return question;
                            }
                            return {
                                ...question,
                                answer: action.json?.answer_id
                            }
                        })
                    }
                }
            }else{
                return {
                    ...state,
                }
            }
        default:
            return state;
    }
};