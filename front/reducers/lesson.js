import {
    getList,
    getLesson,
    setProgress,
    getViewArea,
    addWish,
    clearLesson,
    checkBankPayment,
    checkQpayPayment,
    verifyDevice
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
        case clearLesson.REQUEST:
            return {
                ...initialState
            };
        case addWish.REQUEST:
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    wishLoading: true
                },
            };
        case addWish.RESPONSE:
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    wishLoading: false
                },
            };
        case getList.REQUEST:
            return {
                ...state,
                loading:1
            };
        case getList.RESPONSE:
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
        case setProgress.REQUEST:
            return {
                ...state
            };
        case setProgress.RESPONSE:
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
        case getLesson.REQUEST:
            return {
                ...state,
                lessonLoading:1
            };
        case getLesson.RESPONSE:
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
        case getViewArea.REQUEST:
            return {
                ...state,
                loadingView:1
            };
        case getViewArea.RESPONSE:
            if(action.json.success) {
                config.get('emitter').emit('setProgram', action.json.lesson || {});
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
        case checkBankPayment.RESPONSE:
            if(action.json.success && (state.lesson || {})._id) {
                if ((action.json.transaction || {}).type === 'lesson' && ((action.json.transaction || {}).lesson || 'fd').toString() === ((state.lesson || {})._id || 'ww').toString()) {
                    return {
                        ...state,
                        lesson: {
                            ...state.lesson,
                            paid: true
                        },
                    };
                } else if ((action.json.transaction || {}).type === 'premium' || (action.json.transaction || {}).type === 'eish') {
                    let paid = ((action.json.transaction || {}).type === 'eish' && state.lesson.eish);
                    if ((action.json.transaction || {}).type === 'premium') {
                        paid = true
                    }
                    return {
                        ...state,
                        lesson: {
                            ...state.lesson,
                            paid: paid
                        },
                    };
                } else {
                    return {
                        ...state,
                    };
                }
            } else {
                return {
                    ...state,
                };
            }
        case checkQpayPayment.RESPONSE:
            if(action.json.success && (state.lesson || {})._id) {
                if((action.json.transaction || {}).type === 'lesson' && ((action.json.transaction || {}).lesson || 'fd').toString() === ((state.lesson || {})._id || 'ww').toString()) {
                    return {
                        ...state,
                        lesson: {
                            ...state.lesson,
                            paid: true
                        },
                    };
                } else if((action.json.transaction || {}).type === 'premium' || (action.json.transaction || {}).type === 'eish') {
                    let paid = ((action.json.transaction || {}).type === 'eish' && state.lesson.eish);
                    if((action.json.transaction || {}).type === 'premium') {
                        paid = true
                    }
                    return {
                        ...state,
                        lesson: {
                            ...state.lesson,
                            paid: paid
                        },
                    };
                } else {
                    return {
                        ...state,
                    };
                }
            } else {
                return {
                    ...state,
                };
            }
        case verifyDevice.RESPONSE: {
            if (action.json.success && action.json.verificationFail) {
                window.location.assign("/warning")
            }
        }
        default:
            return state;
    }
};