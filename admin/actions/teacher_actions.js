import * as constants from "../actionTypes";
import * as networkActions from './networkActions';


export function openTeacherModal(data){
    return {
        type: constants.openTeacherModal.REQUEST,
        json: data
    }
}
export function closeTeacherModal(){
    return {
        type: constants.closeTeacherModal.REQUEST,
    }
}
export function teacherChangeHandler(data){
    return {
        type: constants.teacherChangeHandler.REQUEST,
        json: data
    }
}
export function submitTeacher(data) {
    let url = `/admin/api/submitTeacher`;
    return networkActions.requestPost(constants.submitTeacher,url, data);
}
export function getTeachers(data) {
    let url = `/admin/api/getTeachers`;
    return networkActions.requestGet(constants.getTeachers,url, data);
}
export function deleteTeachers(data) {
    let url = `/admin/api/deleteTeachers`;
    return networkActions.requestPost(constants.deleteTeachers,url, data);
}