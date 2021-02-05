import {
    openAudioModal,
    closeAudioModal,
    audioChangeHandler,
    submitAudio,
    deleteAudio,
    getAudios,
    searchTeacher,
    openLessonModalLevel,
    closeLessonModalLevel,
    lessonChangeHandlerLevel,
    setAudioFeatured,
    uploadLessonImage,
    uploadLessonVideo,
    openLevelSingle,
    closeLevelSingle,
    removeUploadedFileAudioEdit,
    chooseMediaAudioEdit,
} from "../actionTypes";
const initialState = {
    status: 1,
    openModal: false,
    audios:[],
    categories:[],
    all:0,

    submitAudioLoader: false,
    audio: {},
    level: {},
    openModalLevel: false,
    levelType: '',
    levelIdx: null,
    audioImage: {},
    imageUploadLoading: false,
    openLevelSingle: false,
    audioImageProgress: {},
};

export default(state = initialState, action) => {
    switch (action.type) {
        case setAudioFeatured.REQUEST:
            let featured = !!state.audio.featured;
            return {
                ...state,
                audio:{
                    ...state.audio,
                    featured: !featured
                }
            };
        case chooseMediaAudioEdit.REQUEST:
            return {
                ...state,
                audioImage: action.json.data[0]
            };
        case removeUploadedFileAudioEdit.REQUEST:
            return {
                ...state,
                [action.json.name]: {},
            };
        case openLevelSingle.REQUEST:
            return {
                ...state,
                openLevelSingle: true,
                lesson: action.json
            };
        case closeLevelSingle.REQUEST:
            return {
                ...state,
                openLevelSingle: false,
                // lessons: (state.lessons || []).map(function (run) {
                //     if(){}
                // }),
                lesson:{}
            };
        case uploadLessonImage.REQUEST:
            return {
                ...state,
                imageUploadLoading: true,
                lessonImage:{}
            };
        case uploadLessonImage.PROGRESS:
            return {
                ...state,
                lessonImageProgress: (action.json || {})
            };
        case uploadLessonImage.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    imageUploadLoading: false,
                    lessonImage: action.json.image
                };
            } else {
                return {
                    ...state,
                    imageUploadLoading: false
                };
            }
        case deleteAudio.REQUEST:
            if(action.json._id){
                return {
                    ...state,
                    audios: state.audios.map( function (run) {
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
        case deleteAudio.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    audios: (action.json.audios || []),
                    all: state.all - 1
                };
            } else {
                if(action.json._id){
                    return {
                        ...state,
                        audios: state.audios.map( function (run) {
                            if(run._id.toString() === action.json._id.toString()){
                                run.loading = false;
                            }
                            return run;
                        } ),
                        all: state.all - 1
                    };
                } else {
                    return {
                        ...state
                    };
                }
            }
        case getAudios.REQUEST:
            return {
                ...state,
                status: 1
            };
        case getAudios.RESPONSE:
            let cats = (action.json.categories || []);
            let parents = [];
            let hold = [];
            cats.map(function (run) {
                if(run.parent && run.parent !== '' ){
                    if(parents.length > 0){
                        if(parents.some(ff => ff !== run.parent)){
                            parents.push(run.parent);
                        }
                    } else {
                        parents.push(run.parent);
                    }
                }
            });
            cats.map(function (run) {
                if(parents.some(ff => ff === run._id)){
                    hold.push(run);
                    cats = cats.filter(ss => ss._id !== run._id)
                }
            });
            cats.map(function (run) {
                if(!run.parent ){
                    hold.push(run);
                    cats = cats.filter(ss => ss._id !== run._id)
                }
            });
            cats.map(function (run) {
                hold.map(function (ho) {
                    if(run.parent === ho._id){
                        if(ho.child){
                            ho.child.push(run);
                        } else {
                            ho.child = [run];
                        }
                        cats = cats.filter(ss => ss._id !== run._id)
                    }
                });
            });
            return {
                ...state,
                status: 0,
                audios: (action.json.audios || []),
                categories: (hold || []),
                all: (action.json.all || 0),
            };
        case audioChangeHandler.REQUEST:
            return {
                ...state,
                audio:{
                    ...state.audio,
                    [action.json.name]:action.json.value
                },
            };
        case openAudioModal.REQUEST:
            return {
                ...state,
                openModal: true,
                audio:action.json,
                audioImage:action.json.thumbnail,
                audioImageProgress: {},
            };
        case closeAudioModal.REQUEST:
            return {
                ...state,
                openModal: false,
                audio:{},
                audioImage: {},
                audioImageProgress: {},
            };
        case submitAudio.REQUEST:
            return {
                ...state,
                submitAudioLoader: true,
            };
        case submitAudio.RESPONSE:
            if(action.json.success){
                if(action.json._id){ // update
                    return {
                        ...state,
                        submitAudioLoader: false,
                        openModal: false,
                        lessons: state.lessons.map(function (run) {
                            if(run._id === action.json._id){
                                run.category= action.json.data.category;
                                run.description= action.json.data.description;
                                run.intro_desc= action.json.data.intro_desc;
                                run.thumbnail= action.json.data.audioImage;
                                run.featured= action.json.data.featured;
                                run.title= action.json.data.title;
                                run.created= action.json.data.created;
                            }
                            return run;
                        })
                    };
                } else { // new
                    let audios={
                        _id: action.json.data._id,
                        category: action.json.data.category,
                        description: action.json.data.description,
                        intro_desc: action.json.data.intro_desc,
                        thumbnail: action.json.data.audioImage,
                        featured: action.json.data.featured,
                        title: action.json.data.title,
                        created: action.json.data.created,
                    };
                    return {
                        ...state,
                        submitAudioLoader: false,
                        openModal: false,
                        all: state.all + 1,
                        audios:[
                            audios,
                            ...state.audios,
                        ],
                    };
                }
            } else {
                return {
                    ...state,
                    submitAudioLoader: false
                };
            }
        default:
            return state;
    }
};