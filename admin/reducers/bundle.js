import {
    closeBundleModal,
    openBundleModal,
    bundleChangeHandler,
    submitTeacher,
    deleteTeachers,
    getTeachers,
    uploadBundleThumbnail
} from "../actionTypes";
const initialState = {
    status: 1,
    openModal: false,
    bundles:[],
    all:0,
    submitBundleLoader: false,
    bundle: {},
    imageUploadLoading: false,

    bundleThumbnail:{},
    bundleThumbnailProgress:{},

};

export default(state = initialState, action) => {
    switch (action.type) {
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
        // case deleteTeachers.REQUEST:
        //     if(action.json._id){
        //         return {
        //             ...state,
        //             bundles: state.bundles.map( function (run) {
        //                 if(run._id.toString() === action.json._id.toString()){
        //                     run.loading = true;
        //                 }
        //                 return run;
        //             } )
        //         };
        //     } else {
        //         return {
        //             ...state
        //         };
        //     }
        // case deleteTeachers.RESPONSE:
        //     if(action.json.success){
        //         return {
        //             ...state,
        //             bundles: (action.json.bundles || []),
        //             all: state.all - 1
        //         };
        //     } else {
        //         if(action.json._id){
        //             return {
        //                 ...state,
        //                 bundles: state.bundles.map( function (run) {
        //                     if(run._id.toString() === action.json._id.toString()){
        //                         run.loading = false;
        //                     }
        //                     return run;
        //                 }),
        //                 all: state.all - 1
        //             };
        //         } else {
        //             return {
        //                 ...state
        //             };
        //         }
        //     }
        // case getTeachers.REQUEST:
        //     return {
        //         ...state,
        //         status: 1
        //     };
        // case getTeachers.RESPONSE:
        //     return {
        //         ...state,
        //         status: 0,
        //         bundles: (action.json.bundles || []),
        //         all: (action.json.all || 0)
        //     };
        case bundleChangeHandler.REQUEST:
            return {
                ...state,
                bundle:{
                    ...state.bundle,
                    [action.json.name]:action.json.value,
                },
            };
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
        // case submitTeacher.REQUEST:
        //     return {
        //         ...state,
        //         submitBundleLoader: true,
        //     };
        // case submitTeacher.RESPONSE:
        //     if(action.json.success){
        //         if(action.json._id){
        //             return {
        //                 ...state,
        //                 submitBundleLoader: false,
        //                 openModal: false,
        //                 bundles: state.bundles.map(function (run) {
        //                     if(run._id === action.json._id){
        //                         run.first_name =  action.json.data.first_name;
        //                         run.last_name = action.json.data.last_name;
        //                         run.bio = action.json.data.bio;
        //                         run.email = action.json.data.email;
        //                         run.phone = action.json.data.phone;
        //                         run.avatar = action.json.data.avatar;
        //                     }
        //                     return run;
        //                 })
        //             };
        //         } else {
        //             return {
        //                 ...state,
        //                 submitBundleLoader: false,
        //                 openModal: false,
        //                 all: state.all + 1,
        //                 bundles:[
        //                     action.json.data,
        //                     ...state.bundles,
        //                 ]
        //             };
        //         }
        //     } else {
        //         return {
        //             ...state,
        //             submitBundleLoader: false
        //         };
        //     }
        default:
            return state;
    }
};