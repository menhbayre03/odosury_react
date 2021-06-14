import {
    openUserModal,
    closeUserModal,
    userChangeHandler,
    submitUser,
    deleteUsers,
    getUsers,
    uploadUserAvatar
} from "../actionTypes";
const initialState = {
    status: 1,
    openModal: false,
    users:[],
    all:0,
    submitUserLoader: false,
    user: {},
    imageUploadLoading: false,
};

export default(state = initialState, action) => {
    switch (action.type) {
        case uploadUserAvatar.REQUEST:
            return {
                ...state,
                imageUploadLoading: true,
            };
        case uploadUserAvatar.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    imageUploadLoading: false,
                    user: {
                        ...state.user,
                        avatar: action.json.avatar
                    }
                };
            } else {
                return {
                    ...state,
                    imageUploadLoading: false
                };
            }
        case deleteUsers.REQUEST:
            if(action.json._id){
                return {
                    ...state,
                    users: state.users.map( function (run) {
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
        case deleteUsers.RESPONSE:
            // return {
            //     ...state,
            //     users: action.json.success ?
            //         state.users.filter(c => c._id !== action.json.id)
            //     : state.users,
            //     all: action.json.success ? state.all - 1 : state.all
            // }
            if(action.json.success){
                return {
                    ...state,
                    users: (action.json.users || []),
                    all: state.all - 1
                };
            } else {
                if(action.json._id){
                    return {
                        ...state,
                        users: state.users.map( function (run) {
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
        case getUsers.REQUEST:
            return {
                ...state,
                status: 1
            };
        case getUsers.RESPONSE:
            return {
                ...state,
                status: 0,
                users: (action.json.users || []),
                all: (action.json.all || 0)
            };
        case userChangeHandler.REQUEST:
            return {
                ...state,
                user:{
                    ...state.user,
                    [action.json.name]:action.json.value
                },
            };
        case openUserModal.REQUEST:
            return {
                ...state,
                openModal: true,
                user:action.json
            };
        case closeUserModal.REQUEST:
            return {
                ...state,
                openModal: false,
                user:{},
            };
        case submitUser.REQUEST:
            return {
                ...state,
                submitUserLoader: true,
            };
        case submitUser.RESPONSE:
            if(action.json.success){
                if(action.json._id){
                    return {
                        ...state,
                        submitUserLoader: false,
                        openModal: false,
                        users: state.users.map(function (run) {
                            if(run._id === action.json._id){
                                run.username =  action.json.data.username;
                                run.first_name =  action.json.data.first_name;
                                run.last_name = action.json.data.last_name;
                                run.bio = action.json.data.bio;
                                run.email = action.json.data.email;
                                run.phone = action.json.data.phone;
                                run.avatar = action.json.data.avatar;
                                run.role = action.json.data.role;
                                run.status = action.json.data.status;
                                run.password = action.json.data.password;
                                run.premium = action.json.data.premium ? action.json.data.premium : '';
                            }
                            return run;
                        })
                    };
                } else {
                    return {
                        ...state,
                        submitUserLoader: false,
                        openModal: false,
                        all: state.all + 1,
                        users:[
                            action.json.data,
                            ...state.users,
                        ]
                    };
                }
            } else {
                return {
                    ...state,
                    submitUserLoader: false
                };
            }
        default:
            return state;
    }
};