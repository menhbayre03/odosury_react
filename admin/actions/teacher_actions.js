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

export function uploadTeacherAvatar(data, type, id) {
    let url = `/admin/api/${type}/upload/uploadTeacherAvatar/${id}`;
    return networkActions.requestUploadPostDirect(constants.uploadTeacherAvatar, url,  {}, null, data );
}
export function getTeacherRequests(){
    let url = '/admin/api/get/teacherRequests';
    return networkActions.requestPost(constants.getTeacherRequests, url)
}
export function deleteTeacherRequests(data){
    let url = '/admin/api/deleteTeacherRequests';
    return networkActions.requestPost(constants.deleteTeacherRequests, url, data)
}
export function completedTeacherRequests(data){
    let url = '/admin/api/completedTeacherRequests';
    return networkActions.requestPost(constants.completedTeacherRequests, url, data)
}
export function getFeedback(){
    let url = '/admin/api/get/feedBack';
    return networkActions.requestPost(constants.getFeedback, url)
}
export function deleteFeedback(data){
    let url = '/admin/api/deleteFeedback';
    return networkActions.requestPost(constants.deleteFeedback, url, data)
}
export function completedFeedback(data){
    let url = '/admin/api/completedFeedback';
    return networkActions.requestPost(constants.completedFeedback, url, data)
}