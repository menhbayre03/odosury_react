import * as constants from "../actionTypes";
import * as networkActions from './networkActions';


export function openLessonModal(data){
    return {
        type: constants.openLessonModal.REQUEST,
        json: data
    }
}
export function closeLessonModal(){
    return {
        type: constants.closeLessonModal.REQUEST,
    }
}
export function lessonChangeHandler(data){
    return {
        type: constants.lessonChangeHandler.REQUEST,
        json: data
    }
}
export function openLevelSingle(data){
    return {
        type: constants.openLevelSingle.REQUEST,
        json: data
    }
}export function closeLevelSingle(){
    return {
        type: constants.closeLevelSingle.REQUEST
    }
}
export function submitLesson(data) {
    let url = `/admin/api/submitLesson`;
    return networkActions.requestPost(constants.submitLesson,url, data);
}
export function getLesson(data) {
    let url = `/admin/api/getLesson`;
    return networkActions.requestGet(constants.getLesson,url, data);
}
export function deleteLesson(data) {
    let url = `/admin/api/deleteLesson`;
    return networkActions.requestPost(constants.deleteLesson,url, data);
}
export function searchTeacher(data) {
    let url = `/admin/api/searchTeacher`;
    return networkActions.requestGet(constants.searchTeacher,url, data);
}
export function uploadLessonImage(data, type, id) {
    let url = `/lesson/image/upload`;
    return networkActions.uploadProgress(constants.uploadLessonImage, url, data, type);
}
export function uploadLessonVideo(data, type, id) {
    let url = `/video/upload`;
    return networkActions.uploadProgress(constants.uploadLessonVideo, url, data, type );
}
export function removeUploadedFile(data){
    return {
        type: constants.removeUploadedFileLessonEdit.REQUEST,
        json: data
    }
}
export function chooseMedia(data){
    return {
        type: constants.chooseMediaLessonEdit.REQUEST,
        json: data
    }
}