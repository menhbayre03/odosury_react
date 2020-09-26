import {
    closeLessonModalLevel,
    getLessonSingle,
    lessonAddLevel,
    lessonChangeHandlerLevel,
    openLessonModalLevel,
    orderLevels,
    openModalLevelTimline,
    closeModalLevelTimline,
    onChangeHandlerLevelTimeline,
    submitTimeline,
    onChangeHandlerLevelTimelineSelect,
    deleteLevel,
    removeTimeline,
    uploadTimelineVideo,
    uploadTimelineAudio,
    uploadTimelineFile,
    openEditTimeline,
    closeEditTimeline,
    removeUploadedFile,
} from "../actionTypes";
const initialState = {
    status: 1,
    lesson: {},

    openModalLevel: false,
    level: {},
    levelType: '',
    levelIdx: null,

    openModalLevelTimline: false,
    timeline: {},
    levelIndex: '',
    timelineType: '',
    level_id: '',
    timelineIdx: null,
    timelineSubmitLoader: false,

    timelineVideo: {},
    timelineVideoProgress: {},
    videoUploadLoadingT: false,

    timelineAudio: {},
    timelineAudioProgress: {},
    audioUploadLoadingT: false,

    timelineFile: {},
    timelineFileProgress: {},
    fileUploadLoadingT: false,

    editTimelineLoader: false,
    openEditTimeline: false,

    orderLoader: [],
};

export default(state = initialState, action) => {
    switch (action.type) {
        case removeUploadedFile.REQUEST:
            return {
                ...state,
                [action.json.name]: {},
            };
        case openEditTimeline.REQUEST:
            return {
                ...state,
                editTimelineLoader: true,
            };
        case openEditTimeline.RESPONSE:
            return {
                ...state,
                editTimelineLoader: false,
                openEditTimeline: true,
                timelineVideo: (action.json.timeline.video || null),
                timelineAudio: (action.json.timeline.audio || null),
                timelineFile: (action.json.timeline.include_zip || null),
                timeline:action.json.timeline,
                timelineType: action.json.type,
                level_id: action.json.level_id,
            };
        case closeEditTimeline.REQUEST:
            return {
                ...state,
                openEditTimeline: false,
                editTimelineLoader: false,
                timeline: {},
            };
        case uploadTimelineFile.REQUEST:
            return {
                ...state,
                fileUploadLoadingT: true,
                timelineFile:{}
            };
        case uploadTimelineFile.PROGRESS:
            return {
                ...state,
                timelineFileProgress: (action.json || {})
            };
        case uploadTimelineFile.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    fileUploadLoadingT: false,
                    timelineFile: action.json.result
                };
            } else {
                return {
                    ...state,
                    fileUploadLoadingT: false
                };
            }
        case uploadTimelineAudio.REQUEST:
            return {
                ...state,
                audioUploadLoadingT: true,
                timelineAudio:{}
            };
        case uploadTimelineAudio.PROGRESS:
            return {
                ...state,
                timelineAudioProgress: (action.json || {})
            };
        case uploadTimelineAudio.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    audioUploadLoadingT: false,
                    timelineAudio: action.json.result
                };
            } else {
                return {
                    ...state,
                    audioUploadLoadingT: false
                };
            }
        case uploadTimelineVideo.REQUEST:
            return {
                ...state,
                videoUploadLoadingT: true,
                timelineVideo:{}
            };
        case uploadTimelineVideo.PROGRESS:
            return {
                ...state,
                timelineVideoProgress: (action.json || {})
            };
        case uploadTimelineVideo.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    videoUploadLoadingT: false,
                    timelineVideo: action.json.result
                };
            } else {
                return {
                    ...state,
                    videoUploadLoadingT: false
                };
            }
        case removeTimeline.REQUEST:
            if(action.json.level_id){
                let lvls = (state.lesson.levels || []);
                lvls.map( function (run) {
                    if (run._id.toString() === action.json.level_id.toString()) {
                        (run.programs || []).map(function (aa) {
                            if(aa.timeline._id === action.json.timeline_id){
                                aa.timeline.loading = true;
                            }
                        })
                    }
                });
                return {
                    ...state,
                    lesson: {
                        ...state.lesson,
                        levels: lvls
                    },
                }
            } else {
                return {
                    ...state
                };
            }
        case removeTimeline.RESPONSE:
            if(action.json.level_id){
                let lvls = (state.lesson.levels || []).map(function (run) {
                    if(run._id.toString() === action.json.level_id.toString()){
                        let holdRun = (run.programs || []).filter(function (pr) {
                            if(pr.timeline._id.toString() !== action.json.timeline_id.toString()){
                                return pr;
                            }
                        });
                        return {_id:run._id,progress:run.progress, title:run.title, programs: holdRun};
                    } else {
                        return run;
                    }
                })
                return {
                    ...state,
                    lesson: {
                        ...state.lesson,
                        levels: lvls
                    },
                }
            } else {
                return {
                    ...state
                };
            }
        case deleteLevel.REQUEST:
            if(action.json.level_id){
                let lvls = (state.lesson.levels || []);
                lvls.map( function (run) {
                    if (run._id.toString() === action.json.level_id.toString()) {
                        run.loading = true;
                    }
                });
                return {
                    ...state,
                    lesson: {
                        ...state.lesson,
                        levels: lvls
                    },
                }
            } else {
                return {
                    ...state
                };
            }
        case deleteLevel.RESPONSE:
            if(action.json.level_id){
                let lvls = (state.lesson.levels || []).filter( function (run) {
                    if (run._id.toString() !== action.json.level_id.toString()) {
                        return run;
                    }
                });
                return {
                    ...state,
                    lesson: {
                        ...state.lesson,
                        levels: lvls
                    },
                }
            } else {
                return {
                    ...state
                };
            }
        case submitTimeline.REQUEST:
            return {
                ...state,
                timelineSubmitLoader: true
            };
        case submitTimeline.RESPONSE:
            if(action.json.success){
                let timeline = {
                    _id: action.json.data._id,
                    lesson: action.json.data.lesson,
                    type: action.json.data.type,
                    title: action.json.data.title,
                    minutes: action.json.data.minutes,
                    created: action.json.data.created,
                    description: action.json.data.description,
                    video: action.json.data.video,
                    audio: action.json.data.audio,
                    include_zip: action.json.data.include_zip,
                    content: action.json.data.content,
                    user: action.json.data.user,
                };
                if(action.json.timelineType === 'new'){
                    let levels = (state.lesson.levels || []).map(function (run) {
                        if(run._id === action.json.level_id){
                            if(run.programs && run.programs.length>0){
                                run.programs.push({timeline:timeline, passed_users:[]})
                            } else {
                                run.programs = [{timeline:timeline, passed_users:[]}];
                            }
                        }
                        return run;
                    });
                    return {
                        ...state,
                        timelineSubmitLoader: false,
                        openModalLevelTimline: false,
                        lesson:{
                            ...state.lesson,
                            levels: levels
                        }
                    };
                } else if(action.json.timelineType === 'update'){
                    let levels = (state.lesson.levels || []).map(function (run) {
                        if(run._id === action.json.level_id){
                            if(run.programs && run.programs.length>0){
                                run.programs.map(function (dss) {
                                    if(dss.timeline._id === timeline._id){
                                        dss.timeline = timeline
                                    }
                                });
                            }
                        }
                        return run;
                    });
                    return {
                        ...state,
                        editTimelineLoader: false,
                        openEditTimeline: false,
                        lesson:{
                            ...state.lesson,
                            levels: levels
                        }
                    };
                }
                return {
                    ...state,
                    timelineSubmitLoader: false,
                    openModalLevelTimline: false,
                };
            }else {
                return {
                    ...state,
                    openModalLevelTimline: false,
                    timelineSubmitLoader: false,
                };
            }

        case onChangeHandlerLevelTimelineSelect.REQUEST:
            return {
                ...state,
                timeline:{
                    ...state.timeline,
                    [action.json.name]:action.json.value
                },
            };
        case onChangeHandlerLevelTimeline.REQUEST:
            return {
                ...state,
                timeline:{
                    ...state.timeline,
                    [action.json.name]:action.json.value
                },
            };
        case openModalLevelTimline.REQUEST:
            return {
                ...state,
                openModalLevelTimline: true,
                level_id: action.json.level_id,
                timelineType: action.json.type,
                timeline: action.json.timeline,
                timelineFile : {},
                timelineAudio : {},
                timelineVideo : {},
            };
        case closeModalLevelTimline.REQUEST:
            return {
                ...state,
                openModalLevelTimline: false,
                timeline: {},
                level_id: '',
                timelineType: '',
                timelineFile : {},
                timelineAudio : {},
                timelineVideo : {},
            };
        case orderLevels.REQUEST:
            return {
                ...state,
                orderLoader: [
                    ...state.orderLoader,
                    action.json.level_id
                ]
            };
        case orderLevels.RESPONSE:
            let holdLvl = (state.lesson.levels || []);
            holdLvl = holdLvl.map(function (run, idx) {
                if(idx === action.json.collection){
                    run.programs = action.json.sineLevel
                }
                return run;
            });
            return {
                orderLoader: state.orderLoader.filter(run => run !== action.json.level_id),
                lesson: {
                    ...state.lesson,
                    levels: holdLvl
                }
            };
        case lessonAddLevel.REQUEST:
            return {
                ...state,
            };
        case lessonAddLevel.RESPONSE:
            let holdLesson = state.lesson;
            if(action.json.levelType === 'new'){
                if(holdLesson && holdLesson.levels && holdLesson.levels.length>0){
                    holdLesson.levels.push({...state.level, _id: action.json._id});
                } else {
                    holdLesson.levels = [{...state.level, _id: action.json._id}];
                }
            } else if(action.json.levelType === 'update') {
                // holdLesson.levels[state.levelIdx]._id = action.json._id;
                holdLesson.levels[state.levelIdx].title = state.level.title;
            }
            return {
                ...state,
                lesson: holdLesson,
                level:{},
                openModalLevel: false,
            };
        case lessonChangeHandlerLevel.REQUEST:
            return {
                ...state,
                level:{
                    ...state.level,
                    [action.json.name]:action.json.value
                },
            };
        case openLessonModalLevel.REQUEST:
            return {
                ...state,
                openModalLevel: true,
                orderLoader: [],
                level:action.json.level,
                levelType: action.json.type,
                levelIdx: action.json.idx,
            };
        case closeLessonModalLevel.REQUEST:
            return {
                ...state,
                openModalLevel: false,
                level: {},
                levelType: '',
                levelIdx: null,
            };
        case getLessonSingle.REQUEST:
            return {
                ...state,
                status: 1
            };
        case getLessonSingle.RESPONSE:
            return {
                ...state,
                status: 0,
                lesson: (action.json.lesson || {})
            };
        default:
            return state;
    }
};