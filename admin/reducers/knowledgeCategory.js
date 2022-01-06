import {
    openKnowledgeCategoryModal,
    closeKnowledgeCategoryModal,
    knowledgeCategoryChangeHandler,
    submitKnowledgeCategory,
    deleteKnowledgeCategory,
    getKnowledgeCategory
} from "../actionTypes";
const initialState = {
    status: 1,
    openModal: false,
    categories:[],
    allCategories:[],
    all:0,
    submitCategoryLoader: false,
    category:{},
};

export default(state = initialState, action) => {
    switch (action.type) {
        case deleteKnowledgeCategory.REQUEST:
            if(action.json._id){
                return {
                    ...state,
                    categories: state.categories.map( function (run) {
                        if(run._id.toString() === action.json._id.toString()){
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
        case deleteKnowledgeCategory.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    categories: (action.json.categories || []),
                    all: state.all - 1
                };
            } else {
                if(action.json._id){
                    return {
                        ...state,
                        categories: state.categories.map( function (run) {
                            if(run._id.toString() === action.json._id.toString()){
                                run.loading = false;
                            }
                            return run;
                        } ),
                        allCategories: state.allCategories.map( function (run) {
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
        case getKnowledgeCategory.REQUEST:
            return {
                ...state,
                status: 1
            };
        case getKnowledgeCategory.RESPONSE:
            return {
                ...state,
                status: 0,
                categories: (action.json.categories || []),
                allCategories: (action.json.allCategories || []),
                all: (action.json.all || 0)
            };
        case knowledgeCategoryChangeHandler.REQUEST:
            return {
                ...state,
                category:{
                    ...state.category,
                    [action.json.name]:action.json.value
                },
            };
        case openKnowledgeCategoryModal.REQUEST:
            return {
                ...state,
                openModal: true,
                category:action.json,
            };
        case closeKnowledgeCategoryModal.REQUEST:
            return {
                ...state,
                openModal: false,
                category:{},
            };
        case submitKnowledgeCategory.REQUEST:
            return {
                ...state,
                submitCategoryLoader: true,
            };
        case submitKnowledgeCategory.RESPONSE:
            if(action.json.success){
                if(action.json._id){
                    return {
                        ...state,
                        submitCategoryLoader: false,
                        openModal: false,
                        categories: state.categories.map(function (run) {
                            if(run._id === action.json._id){
                                run.title =  action.json.data.title;
                                run.parent =  action.json.data.parent;
                            }
                            return run;
                        }),
                        allCategories: state.allCategories.map(function (run) {
                            if(run._id === action.json._id){
                                run.title =  action.json.data.title;
                                run.parent =  action.json.data.parent;
                            }
                            return run;
                        })
                    };
                } else {
                    return {
                        ...state,
                        submitCategoryLoader: false,
                        openModal: false,
                        all: state.all + 1,
                        categories:[
                            action.json.data,
                            ...state.categories,
                        ],
                        allCategories:[
                            action.json.data,
                            ...state.categories,
                        ]
                    };
                }
            } else {
                return {
                    ...state,
                    submitCategoryLoader: false
                };
            }
        default:
            return state;
    }
};