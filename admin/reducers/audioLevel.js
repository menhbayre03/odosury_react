import {
    // closeLessonModalLevel,
    getAudioSingle,
    openEditAudioTimeline,
    // lessonAddLevel,
    // lessonChangeHandlerLevel,
    // openLessonModalLevel,
    orderLevelsAudio,
    // openModalLevelTimline,
    // closeModalLevelTimline,
    onChangeHandlerLevelTimelineAudio,
    submitTimelineAudio,
    // onChangeHandlerLevelTimelineSelect,
    // deleteLevel,
    removeAudioTimeline,
    // uploadTimelineVideo,
    // uploadTimelineAudio,
    // uploadTimelineFile,
    closeEditTimelineAudio,
    removeUploadedFileAudio,
    chooseMediaAudio,
} from "../actionTypes";
const initialState = {
    status: 1,
    audio: {},

    // openModalLevel: false,
    // levelType: '',
    // levelIdx: null,
    //
    // openModalLevelTimline: false,
    timeline: {},
    // levelIndex: '',
    // timelineIdx: null,
    // timelineSubmitLoader: false,
    //
    // timelineVideo: {},
    // timelineVideoProgress: {},
    // videoUploadLoadingT: false,

    timelineAudio: {},
    timelineAudioProgress: {},
    // audioUploadLoadingT: false,
    //
    // timelinePdf: {},
    // timelinePdfProgress: {},
    // pdfUploadLoadingT: false,
    //
    // timelineFile: {},
    // timelineFileProgress: {},
    // fileUploadLoadingT: false,
    //
    editTimelineLoader: false,
    openEditTimeline: false,
    //
    orderLoader: false,
};

export default(state = initialState, action) => {
    switch (action.type) {
        case chooseMediaAudio.REQUEST:
            if(action.json.medType === 'audio'){
                return {
                    ...state,
                    timelineAudio: action.json.data[0]
                };
            } else {
                return {
                    ...state,
                };
            }
        case removeUploadedFileAudio.REQUEST:
            return {
                ...state,
                [action.json.name]: {},
            };
        case openEditAudioTimeline.REQUEST:
            return {
                ...state,
                editTimelineLoader: true,
            };
        case openEditAudioTimeline.RESPONSE:
            return {
                ...state,
                editTimelineLoader: false,
                openEditTimeline: true,
                timelineAudio: action.json.type === 'new' ? null : (action.json.timeline.audio || null),
                timeline:action.json.type === 'new' ? action.json.timelineId : action.json.timeline,
            };
        case closeEditTimelineAudio.REQUEST:
            return {
                ...state,
                openEditTimeline: false,
                editTimelineLoader: false,
                timeline: {},
            };
        // case uploadTimelineFile.REQUEST:
        //     return {
        //         ...state,
        //         fileUploadLoadingT: true,
        //         timelineFile:{}
        //     };
        // case uploadTimelineFile.PROGRESS:
        //     return {
        //         ...state,
        //         timelineFileProgress: (action.json || {})
        //     };
        // case uploadTimelineFile.RESPONSE:
        //     if(action.json.success){
        //         return {
        //             ...state,
        //             fileUploadLoadingT: false,
        //             timelineFile: action.json.result
        //         };
        //     } else {
        //         return {
        //             ...state,
        //             fileUploadLoadingT: false
        //         };
        //     }
        // case uploadTimelineAudio.REQUEST:
        //     return {
        //         ...state,
        //         audioUploadLoadingT: true,
        //         timelineAudio:{}
        //     };
        // case uploadTimelineAudio.PROGRESS:
        //     return {
        //         ...state,
        //         timelineAudioProgress: (action.json || {})
        //     };
        // case uploadTimelineAudio.RESPONSE:
        //     if(action.json.success){
        //         return {
        //             ...state,
        //             audioUploadLoadingT: false,
        //             timelineAudio: action.json.result
        //         };
        //     } else {
        //         return {
        //             ...state,
        //             audioUploadLoadingT: false
        //         };
        //     }
        // case uploadTimelineVideo.REQUEST:
        //     return {
        //         ...state,
        //         videoUploadLoadingT: true,
        //         timelineVideo:{}
        //     };
        // case uploadTimelineVideo.PROGRESS:
        //     return {
        //         ...state,
        //         timelineVideoProgress: (action.json || {})
        //     };
        // case uploadTimelineVideo.RESPONSE:
        //     if(action.json.success){
        //         return {
        //             ...state,
        //             videoUploadLoadingT: false,
        //             timelineVideo: action.json.result
        //         };
        //     } else {
        //         return {
        //             ...state,
        //             videoUploadLoadingT: false
        //         };
        //     }
        case removeAudioTimeline.REQUEST:
            if(action.json.progId){
                let aaa = (state.audio.programs || []).map(function (aa) {
                    if(aa._id === action.json.progId){
                        return {...aa, loading: true};
                    } else {
                        return aa
                    }
                });
                return {
                    ...state,
                    audio: {
                        ...state.audio,
                        programs: aaa
                    },
                }
            } else {
                return {
                    ...state
                };
            }
        case removeAudioTimeline.RESPONSE:
            if(action.json.progId && action.json.success){
                let holdRun = (state.audio.programs || []).filter(function (pr) {
                    return pr._id.toString() !== action.json.progId.toString()
                });
                return {
                    ...state,
                    audio: {
                        ...state.audio,
                        programs: holdRun
                    },
                }
            } else {
                return {
                    ...state
                };
            }
        // case deleteLevel.REQUEST:
        //     if(action.json.level_id){
        //         let lvls = (state.lesson.levels || []);
        //         lvls.map( function (run) {
        //             if (run._id.toString() === action.json.level_id.toString()) {
        //                 run.loading = true;
        //             }
        //         });
        //         return {
        //             ...state,
        //             lesson: {
        //                 ...state.lesson,
        //                 levels: lvls
        //             },
        //         }
        //     } else {
        //         return {
        //             ...state
        //         };
        //     }
        // case deleteLevel.RESPONSE:
        //     if(action.json.level_id){
        //         let lvls = (state.lesson.levels || []).filter( function (run) {
        //             if (run._id.toString() !== action.json.level_id.toString()) {
        //                 return run;
        //             }
        //         });
        //         return {
        //             ...state,
        //             lesson: {
        //                 ...state.lesson,
        //                 levels: lvls
        //             },
        //         }
        //     } else {
        //         return {
        //             ...state
        //         };
        //     }
        case submitTimelineAudio.REQUEST:
            return {
                ...state,
                timelineSubmitLoader: true
            };
        case submitTimelineAudio.RESPONSE:
            if(action.json.success){
                let timeline = {
                    _id: action.json.data._id,
                    audioBook: action.json.data.audioBook,
                    title: action.json.data.title,
                    minutes: action.json.data.minutes,
                    created: action.json.data.created,
                    audio: action.json.data.audio,
                    user: action.json.data.user,
                };
                if(action.json.timelineType === 'new'){
                    let programs = [];
                    if(state.audio.programs && state.audio.programs.length > 0) {
                        programs = [...state.audio.programs, {_id: action.json.progId, timeline:timeline, passed_users:[]}]
                    } else {
                        programs = [{_id: action.json.progId, timeline:timeline, passed_users:[]}]
                    }
                    return {
                        ...state,
                        timelineSubmitLoader: false,
                        editTimelineLoader: false,
                        openEditTimeline: false,
                        audio:{
                            ...state.audio,
                            programs: programs
                        }
                    };
                } else if(action.json.timelineType === 'update'){
                    let programs = state.audio.programs.map(function (dss) {
                        if(dss.timeline._id === timeline._id){
                            return {
                                ...dss,
                                timeline: timeline
                            }
                        } else {
                            return dss
                        }
                    });
                    return {
                        ...state,
                        timelineSubmitLoader: false,
                        editTimelineLoader: false,
                        openEditTimeline: false,
                        audio:{
                            ...state.audio,
                            programs: programs
                        }
                    };
                } else {
                    return {
                        ...state,
                        timelineSubmitLoader: false,
                        editTimelineLoader: false,
                        openEditTimeline: false,
                    };
                }
            }else {
                return {
                    ...state,
                    openModalLevelTimline: false,
                    editTimelineLoader: false,
                    timelineSubmitLoader: false,
                };
            }
        //
        // case onChangeHandlerLevelTimelineSelect.REQUEST:
        //     return {
        //         ...state,
        //         timeline:{
        //             ...state.timeline,
        //             [action.json.name]:action.json.value
        //         },
        //     };
        case onChangeHandlerLevelTimelineAudio.REQUEST:
            return {
                ...state,
                timeline:{
                    ...state.timeline,
                    [action.json.name]:action.json.value
                },
            };
        // case openModalLevelTimline.REQUEST:
        //     return {
        //         ...state,
        //         openModalLevelTimline: true,
        //         level_id: action.json.level_id,
        //         timelineType: action.json.type,
        //         timeline: action.json.timeline,
        //         timelineFile : {},
        //         timelineAudio : {},
        //         timelineVideo : {},
        //         timelinePdf : {},
        //     };
        // case closeModalLevelTimline.REQUEST:
        //     return {
        //         ...state,
        //         openModalLevelTimline: false,
        //         timeline: {},
        //         level_id: '',
        //         timelineType: '',
        //         timelineFile : {},
        //         timelineAudio : {},
        //         timelineVideo : {},
        //     };
        case orderLevelsAudio.REQUEST:
            return {
                ...state,
                orderLoader: true
            };
        case orderLevelsAudio.RESPONSE:
            return {
                orderLoader: false,
                audio: {
                    ...state.audio,
                    programs: action.json.sineLevel
                }
            };
        // case lessonAddLevel.REQUEST:
        //     return {
        //         ...state,
        //     };
        // case lessonAddLevel.RESPONSE:
        //     let holdLesson = state.lesson;
        //     if(action.json.levelType === 'new'){
        //         if(holdLesson && holdLesson.levels && holdLesson.levels.length>0){
        //             holdLesson.levels.push({...state.level, _id: action.json._id});
        //         } else {
        //             holdLesson.levels = [{...state.level, _id: action.json._id}];
        //         }
        //     } else if(action.json.levelType === 'update') {
        //         // holdLesson.levels[state.levelIdx]._id = action.json._id;
        //         holdLesson.levels[state.levelIdx].title = state.level.title;
        //     }
        //     return {
        //         ...state,
        //         lesson: holdLesson,
        //         level:{},
        //         openModalLevel: false,
        //     };
        // case lessonChangeHandlerLevel.REQUEST:
        //     return {
        //         ...state,
        //         level:{
        //             ...state.level,
        //             [action.json.name]:action.json.value
        //         },
        //     };
        // case openLessonModalLevel.REQUEST:
        //     return {
        //         ...state,
        //         openModalLevel: true,
        //         orderLoader: [],
        //         level:action.json.level,
        //         levelType: action.json.type,
        //         levelIdx: action.json.idx,
        //     };
        // case closeLessonModalLevel.REQUEST:
        //     return {
        //         ...state,
        //         openModalLevel: false,
        //         level: {},
        //         levelType: '',
        //         levelIdx: null,
        //     };
        case getAudioSingle.REQUEST:
            return {
                ...state,
                status: 1
            };
        case getAudioSingle.RESPONSE:
            return {
                ...state,
                status: 0,
                audio: (action.json.audio || {})
            };
        default:
            return state;
    }
};