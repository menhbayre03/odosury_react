import {
    getKnowledge,
    closeKnowledgeModal,
    openKnowledgeModal,
    knowledgeChangeHandler,
    submitKnowledge,
    unmountAdminKnowledges,
    deleteKnowledge,
    uploadKnowledgeImage,
    uploadKnowledgeAudio,
    subKnowledgeChangeHandler,
} from "../actionTypes";
const initialState = {
    status: 1,
    knowledges:[],
    all:0,

    openModal: false,
    knowledge:{},
    submitKnowledgeLoader: false,

    categories: [],
    shop_categories: [],
    shop_assets: [],



    knowledgeImage: null,
    knowledgeGallery: null,
    knowledgeAudio: null,
    removedMedias: null,


    openSubKnowledgeModal: false,
    subKnowledges:[],
    subKnowledgeParentSubAssets:[],
    submitSubKnowledgeLoader: false,
    subKnowledgeParent: null,
    subKnowledgeParentTitle: '',



    openSubSubModal: false,
    subKnowledge:{},
    subKnowledgeLoader: false,
};

export default(state = initialState, action) => {
    switch (action.type) {


        case subKnowledgeChangeHandler.REQUEST:
            return {
                ...state,
                subKnowledge:{
                    ...state.subKnowledge,
                    [action.json.name]:action.json.value,
                },
            };
        // ------ ***** -----


        case uploadKnowledgeImage.REQUEST:
            return {
                ...state,
                knowledgeImage: {
                    ...(state.knowledgeImage || {}),
                    percent: 0,
                    loading: true
                }
            };
        case uploadKnowledgeImage.PROGRESS:
            return {
                ...state,
                knowledgeImage: {
                    ...(state.knowledgeImage || {}),
                    percent: action.json.percent
                }
            };
        case uploadKnowledgeImage.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    knowledgeImage: action.json.image,
                };
            } else {
                return {
                    ...state,
                    knowledgeImage: null
                };
            }
        case uploadKnowledgeAudio.REQUEST:
            return {
                ...state,
                knowledgeAudio: {
                    ...(state.knowledgeAudio || {}),
                    percent: 0,
                    loading: true
                }
            };
        case uploadKnowledgeAudio.PROGRESS:
            return {
                ...state,
                knowledgeAudio: {
                    ...(state.knowledgeAudio || {}),
                    percent: action.json.percent
                }
            };
        case uploadKnowledgeAudio.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    knowledgeAudio: action.json.image,
                };
            } else {
                return {
                    ...state,
                    knowledgeAudio: null
                };
            }



        case deleteKnowledge.REQUEST:
            if(action.json._id){
                return {
                    ...state,
                    knowledges: state.knowledges.map( function (run) {
                        if((run._id || 'aa').toString() === (action.json._id || 'ss').toString()){
                            run.loading = true;
                        }
                        return run;
                    } ),
                };
            } else {
                return {
                    ...state
                };
            }
        case deleteKnowledge.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    // knowledges: (action.json.knowledges || []),
                    knowledges: state.knowledges.filter(run => (run._id || 'aa').toString() !== (action.json._id || 'ss').toString()),
                    all: state.all - 1
                };
            } else {
                if(action.json._id){
                    return {
                        ...state,
                        knowledges: state.knowledges.map( function (run) {
                            if((run._id || 'aa').toString() === (action.json._id || 'ss').toString()){
                                run.loading = false;
                            }
                            return run;
                        }),
                    };
                } else {
                    return {
                        ...state
                    };
                }
            }
        case unmountAdminKnowledges.REQUEST:
            return {
                ...state,
                status: 1,
                knowledges:[],
                all:0,

                openModal: false,
                knowledge:{},
                submitKnowledgeLoader: false,



                openSubKnowledgeModal: false,
                subKnowledges:[],
                subKnowledgeParentSubAssets:[],
                submitSubKnowledgeLoader: false,
                subKnowledgeParent: null,
                subKnowledgeParentTitle: '',


                categories: [],
                shop_categories: [],
                shop_assets: [],



                knowledgeImage: null,
                knowledgeGallery: null,
                knowledgeAudio: null,
                removedMedias: null,
            };
        case submitKnowledge.REQUEST:
            return {
                ...state,
                submitKnowledgeLoader: true,
            };
        case submitKnowledge.RESPONSE:
            if(action.json.success){
                if(action.json._id){
                    return {
                        ...state,
                        submitKnowledgeLoader: false,
                        openModal: false,
                        knowledge: {},
                        knowledges: state.knowledges.map(function (run) {
                            if(run._id === action.json._id){
                                run.title =  (action.json.data || {}).title;
                                run.category = (action.json.data || {}).category;
                                run.description= (action.json.data || {}).description;
                                run.tinymce= (action.json.data || {}).tinymce;
                                run.knowledgeImage= (action.json.data || {}).knowledgeImage;
                                run.knowledgeAudio= ((action.json.data || {}).knowledgeAudio);
                            }
                            return run;
                        }),
                    };
                } else {
                    return {
                        ...state,
                        knowledge: {},
                        submitKnowledgeLoader: false,
                        openModal: false,
                        all: state.all + 1,
                        knowledges:[
                            action.json.data,
                            ...state.knowledges,
                        ],
                    };
                }
            } else {
                return {
                    ...state,
                    submitKnowledgeLoader: false
                };
            }
        case knowledgeChangeHandler.REQUEST:
            if(action.json.name === 'category'){
                return {
                    ...state,
                    knowledge:{
                        ...state.knowledge,
                        category:action.json.value,
                        subCategory:  null
                    },
                };
            } else if(action.json.name === 'shop_category'){
                return {
                    ...state,
                    knowledge:{
                        ...state.knowledge,
                        shop_category:action.json.value,
                        shop_subCategory:  null
                    },
                };
            } else if(action.json.name === 'shop_asset'){
                return {
                    ...state,
                    knowledge:{
                        ...state.knowledge,
                        shop_asset:action.json.value,
                        shop_subAsset:  null
                    },
                };
            } else {
                return {
                    ...state,
                    knowledge:{
                        ...state.knowledge,
                        [action.json.name]:action.json.value,
                    },
                };
            }
        case openKnowledgeModal.REQUEST:
            return {
                ...state,
                openModal: true,
                knowledge:(action.json || {}),
                knowledgeImage: (action.json || {}).knowledgeImage,
                knowledgeGallery: (action.json || {}).knowledgeGallery,
                knowledgeAudio: (action.json || {}).knowledgeAudio,
            };
        case closeKnowledgeModal.REQUEST:
            return {
                ...state,
                openModal: false,
                knowledge:{},
                knowledgeImage: null,
                knowledgeGallery: null,
                knowledgeAudio: null,
                removedMedias: null,
            };
        case getKnowledge.REQUEST:
            return {
                ...state,
                status: 1
            };
        case getKnowledge.RESPONSE:

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
                knowledges: (action.json.knowledges || []),
                all: (action.json.all || 0),
                // categories: (action.json.categories || []),
                shop_categories: (action.json.shop_categories || []),
                shop_assets: (action.json.shop_assets || []),
                categories: (hold || []),
            };



        default:
            return state;
    }
};