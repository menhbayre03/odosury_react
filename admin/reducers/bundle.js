import {
    closeBundleModal,
    openBundleModal,
    bundleChangeHandler,
    submitBundle,
    deleteBundle,
    getBundle,
    uploadBundleThumbnail,
    bundleLevelOnChange,
    addLessonToBundleLevels,
    addBundleLevel,
    removeSingleOrts
} from "../actionTypes";
const initialState = {
    status: 1,
    openModal: false,
    bundles:[],
    lessons:[],
    all:0,
    submitBundleLoader: false,
    bundle: {},
    imageUploadLoading: false,

    bundleThumbnail:{},
    bundleThumbnailProgress:{},

    bundleLevelName: '',
    lessonValue: '',

};

export default(state = initialState, action) => {
    switch (action.type) {
        case removeSingleOrts.REQUEST:
            let lvls = (state.bundle.levels || []);
            if(action.json.name === 'lessons'){
                lvls.map(function(run, idx) {
                    if(idx === action.json.index){
                        run.lessons = run.lessons.filter(les => les !== action.json.lessonId);
                    }
                });
            } else if(action.json.name === 'bundleLevel'){
                lvls = lvls.filter((lvl, idx) => idx !== action.json.index);
            }
            return {
                ...state,
                bundle: {
                    ...state.bundle,
                    levels: lvls
                },
            };
        case addLessonToBundleLevels.REQUEST:
            let bundleLvl = (state.bundle.levels || []);
            if(bundleLvl && bundleLvl.length>0) {
                bundleLvl.map(function (run, idx) {
                    if(idx === action.json.index){
                        if(run.lessons && run.lessons.length>0) {
                            if(!run.lessons.some(check => check === state.lessonValue.value)){
                                run.lessons.push(state.lessonValue.value);
                            }
                        } else {
                            run.lessons = [state.lessonValue.value];
                        }
                    }
                    return run;
                });
            }
            return {
                ...state,
                lessonValue: '',
                bundle: {
                    ...state.bundle,
                    levels: bundleLvl
                }
            };
        case addBundleLevel.REQUEST:
            let bundle = state.bundle;
            if(bundle.levels && bundle.levels.length>0) {
                bundle.levels.push({title:state.bundleLevelName, lessons:[]});
            } else {
                bundle.levels = [{title:state.bundleLevelName, lessons:[]}];
            }
            return {
                ...state,
                bundleLevelName: '',
                bundle: bundle
            };
        case uploadBundleThumbnail.REQUEST:
            return {
                ...state,
                imageUploadLoading: true,
                bundleThumbnail:{}
            };
        case uploadBundleThumbnail.PROGRESS:
            return {
                ...state,
                bundleThumbnailProgress: (action.json || {})
            };
        case uploadBundleThumbnail.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    imageUploadLoading: false,
                    bundleThumbnail: action.json.image
                };
            } else {
                return {
                    ...state,
                    imageUploadLoading: false
                };
            }
        case deleteBundle.REQUEST:
            if(action.json._id){
                return {
                    ...state,
                    bundles: state.bundles.map( function (run) {
                        if(run._id.toString() === action.json._id.toString()){
                            run.loading = true;
                        }
                        return run;
                    } )
                };
            } else {
                return {
                    ...state
                };
            }
        case deleteBundle.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    bundles: (action.json.bundles || []),
                    all: state.all - 1
                };
            } else {
                if(action.json._id){
                    return {
                        ...state,
                        bundles: state.bundles.map( function (run) {
                            if(run._id.toString() === action.json._id.toString()){
                                run.loading = false;
                            }
                            return run;
                        }),
                        all: state.all - 1
                    };
                } else {
                    return {
                        ...state
                    };
                }
            }
        case getBundle.REQUEST:
            return {
                ...state,
                status: 1
            };
        case getBundle.RESPONSE:
            return {
                ...state,
                status: 0,
                bundles: (action.json.bundles || []),
                lessons: (action.json.lessons || []),
                all: (action.json.all || 0),
            };
        case bundleChangeHandler.REQUEST:
            return {
                ...state,
                bundle:{
                    ...state.bundle,
                    [action.json.name]:action.json.value,
                },
            };
        case bundleLevelOnChange.REQUEST:
            if(action.json.name === 'bundleLevelName'){
                return {
                    ...state,
                    bundleLevelName: action.json.value
                };
            } else if(action.json.name === 'lessons'){
                return {
                    ...state,
                    lessonValue: {value: action.json.value, index: action.json.index}
                };
            }
        case openBundleModal.REQUEST:
            return {
                ...state,
                openModal: true,
                bundle:action.json,
                bundleThumbnail: action.json.thumbnail,
                bundleThumbnailProgress:{},
            };
        case closeBundleModal.REQUEST:
            return {
                ...state,
                openModal: false,
                bundle:{},
                bundleThumbnail:{},
                bundleThumbnailProgress:{},
            };
        case submitBundle.REQUEST:
            return {
                ...state,
                submitBundleLoader: true,
            };
        case submitBundle.RESPONSE:
            if(action.json.success){
                if(action.json._id){
                    return {
                        ...state,
                        submitBundleLoader: false,
                        openModal: false,
                        bundles: state.bundles.map(function (run) {
                            if(run._id === action.json._id){
                                run = {...action.json.data, thumbnail: action.json.data.bundleThumbnail};
                            }
                            return run;
                        })
                    };
                } else {
                    return {
                        ...state,
                        submitBundleLoader: false,
                        openModal: false,
                        all: state.all + 1,
                        bundles:[
                            action.json.data,
                            ...state.bundles,
                        ]
                    };
                }
            } else {
                return {
                    ...state,
                    submitBundleLoader: false
                };
            }
        default:
            return state;
    }
};