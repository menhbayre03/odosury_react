import {
    openTeacherModal,
    closeTeacherModal,
    teacherChangeHandler,
    submitTeacher,
    deleteTeachers,
    getTeachers
} from "../actionTypes";
const initialState = {
    status: 1,
    openModal: false,
    teachers:[],
    all:0,
    submitTeacherLoader: false,
    teacher: {}
};

export default(state = initialState, action) => {
    switch (action.type) {
        case deleteTeachers.REQUEST:
            if(action.json._id){
                return {
                    ...state,
                    teachers: state.teachers.map( function (run) {
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
        case deleteTeachers.RESPONSE:
            if(action.json.success){
                return {
                    ...state,
                    teachers: (action.json.teachers || []),
                    all: state.all - 1
                };
            } else {
                if(action.json._id){
                    return {
                        ...state,
                        teachers: state.teachers.map( function (run) {
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
        case getTeachers.REQUEST:
            return {
                ...state,
                status: 1
            };
        case getTeachers.RESPONSE:
            return {
                ...state,
                status: 0,
                teachers: (action.json.teachers || []),
                all: (action.json.all || 0)
            };
        case teacherChangeHandler.REQUEST:
            return {
                ...state,
                teacher:{
                    ...state.teacher,
                    [action.json.name]:action.json.value
                },
            };
        case openTeacherModal.REQUEST:
            return {
                ...state,
                openModal: true,
                teacher:action.json
            };
        case closeTeacherModal.REQUEST:
            return {
                ...state,
                openModal: false,
                teacher:{},
            };
        case submitTeacher.REQUEST:
            return {
                ...state,
                submitTeacherLoader: true,
            };
        case submitTeacher.RESPONSE:
            if(action.json.success){
                if(action.json._id){
                    return {
                        ...state,
                        submitTeacherLoader: false,
                        openModal: false,
                        teachers: state.teachers.map(function (run) {
                            if(run._id === action.json._id){
                                run.first_name =  action.json.data.first_name;
                                run.last_name = action.json.data.last_name;
                                run.bio = action.json.data.bio;
                                run.email = action.json.data.email;
                                run.phone = action.json.data.phone;
                                run.avatar = action.json.data.avatar;
                            }
                            return run;
                        })
                    };
                } else {
                    return {
                        ...state,
                        submitTeacherLoader: false,
                        openModal: false,
                        all: state.all + 1,
                        teachers:[
                            action.json.data,
                            ...state.teachers,
                        ]
                    };
                }
            } else {
                return {
                    ...state,
                    submitTeacherLoader: false
                };
            }
        default:
            return state;
    }
};