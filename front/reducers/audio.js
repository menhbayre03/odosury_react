import {
    getListAudio,
    getAudio,
    setProgressAudio,
    getViewAreaAudio,
    clearAudio,
} from "../actionTypes";
import config from "../config";
const initialState = {
    loading: 1,
    list: [],
    rating: 0,
    lessonLoading: 1,
    lesson: {},
    lessonView: {},
    loadingView: 1,
};

export default(state = initialState, action) => {
    switch (action.type) {
        case clearAudio.REQUEST:
            return {
                ...state,
                lesson: {},
                rating: 0,
                lessonLoading: 1
            };
        case getListAudio.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getListAudio.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    list: action.json.results.list || [],
                    loading:0
                };
            } else {
                return {
                    ...state,
                    list: [],
                    loading:2
                };
            }
        case setProgressAudio.REQUEST:
            return {
                ...state
            };
        case setProgressAudio.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    lessonView: {
                        ...state.lessonView,
                        levels: state.lessonView.levels.map(level => {
                            return {
                                ...level,
                                programs: level.programs.map(prog => {
                                    if(prog._id.toString() === action.json.program.toString()) {
                                        return {
                                            ...prog,
                                            passed_users: [...prog.passed_users || [], action.json.user_id]
                                        }
                                    } else {
                                        return prog
                                    }
                                })
                            }
                        })
                    }
                };
            } else {
                return {
                    ...state
                };
            }
        case getAudio.REQUEST:
            return {
                ...state,
                lessonLoading:1
            };
        case getAudio.RESPONSE:
            if(action.json.success) {
                let data = action.json.lesson || {};
                let rating = 0;
                if((data.rating || []).length > 0) {
                    rating = data.rating.reduce((total, rate) => (total + rate.rate), 0) / data.rating.length
                }
                return {
                    ...state,
                    lesson: data || {},
                    rating: rating || 0,
                    lessonLoading:0
                };
            } else {
                return {
                    ...state,
                    lesson: {},
                    rating: 0,
                    lessonLoading:2
                };
            }
        case getViewAreaAudio.REQUEST:
            return {
                ...state,
                loadingView:1
            };
        case getViewAreaAudio.RESPONSE:
            if(action.json.success) {
                config.get('emitter').emit('setProgramAudio', action.json.lesson || {});
                return {
                    ...state,
                    lessonView: action.json.lesson || {},
                    loadingView:0
                };
            } else {
                return {
                    ...state,
                    lessonView: {},
                    loadingView:2
                };
            }
        default:
            return state;
    }
};