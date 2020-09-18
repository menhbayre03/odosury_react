import {
    openLessonModal,
    closeLessonModal,
    lessonChangeHandler,
    submitTeacher,
    deleteTeachers,
    getLesson,
    searchTeacher
} from "../actionTypes";
const initialState = {
    status: 1,
    openModal: false,
    lessons:[],
    categories:[],
    all:0,
    submitLessonLoader: false,
    lesson: {},
    searchTeachersResult:[],
    searchTeacherLoader: false,
};

export default(state = initialState, action) => {
    switch (action.type) {
        // case deleteTeachers.REQUEST:
        //     if(action.json._id){
        //         return {
        //             ...state,
        //             lessons: state.lessons.map( function (run) {
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
        //             lessons: (action.json.lessons || []),
        //             all: state.all - 1
        //         };
        //     } else {
        //         if(action.json._id){
        //             return {
        //                 ...state,
        //                 lessons: state.lessons.map( function (run) {
        //                     if(run._id.toString() === action.json._id.toString()){
        //                         run.loading = false;
        //                     }
        //                     return run;
        //                 } ),
        //                 all: state.all - 1
        //             };
        //         } else {
        //             return {
        //                 ...state
        //             };
        //         }
        //     }
        case searchTeacher.REQUEST:
            return {
                ...state,
                searchTeacherLoader: true
            };
        case searchTeacher.RESPONSE:
            return {
                ...state,
                searchTeacherLoader: false,
                searchTeachersResult: (action.json.teachers || [])
            };
        case getLesson.REQUEST:
            return {
                ...state,
                status: 1
            };
        case getLesson.RESPONSE:
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
                lessons: (action.json.lessons || []),
                categories: (hold || []),
                all: (action.json.all || 0)
            };
        case lessonChangeHandler.REQUEST:
            return {
                ...state,
                lesson:{
                    ...state.lesson,
                    [action.json.name]:action.json.value
                },
            };
        case openLessonModal.REQUEST:
            return {
                ...state,
                openModal: true,
                lesson:action.json,
                searchTeachersResult:[],
            };
        case closeLessonModal.REQUEST:
            return {
                ...state,
                openModal: false,
                lesson:{}
            };
        // case submitTeacher.REQUEST:
        //     return {
        //         ...state,
        //         submitLessonLoader: true,
        //     };
        // case submitTeacher.RESPONSE:
        //     if(action.json.success){
        //         if(action.json._id){
        //             return {
        //                 ...state,
        //                 submitLessonLoader: false,
        //                 openModal: false,
        //                 lessons: state.lessons.map(function (run) {
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
        //             let lesson={
        //                 _id: action.json.data._id,
        //                 first_name: action.json.data.first_name,
        //                 last_name: action.json.data.last_name,
        //                 bio: action.json.data.bio,
        //                 email: action.json.data.email,
        //                 phone: action.json.data.phone,
        //                 avatar: action.json.data.avatar,
        //                 status: action.json.data.status,
        //                 created: action.json.data.created
        //             };
        //             return {
        //                 ...state,
        //                 submitLessonLoader: false,
        //                 openModal: false,
        //                 all: state.all + 1,
        //                 lessons:[
        //                     lesson,
        //                     ...state.lessons,
        //                 ]
        //             };
        //         }
        //     } else {
        //         return {
        //             ...state,
        //             submitLessonLoader: false
        //         };
        //     }
        default:
            return state;
    }
};