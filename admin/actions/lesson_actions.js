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
export function lessonChangeHandlerLevel(data){
    return {
        type: constants.lessonChangeHandlerLevel.REQUEST,
        json: data
    }
}
export function openLessonModalLevel(data){
    return {
        type: constants.openLessonModalLevel.REQUEST,
        json: data
    }
}
export function orderLevels(data){
    return {
        type: constants.orderLevels.REQUEST,
        json: data
    }
}
export function closeLessonModalLevel(){
    return {
        type: constants.closeLessonModalLevel.REQUEST
    }
}
export function lessonAddLevel(){
    return {
        type: constants.lessonAddLevel.REQUEST
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
    let url = `/admin/api/${type}/upload/${id}`;
    return networkActions.requestUploadPostDirect(constants.uploadLessonImage, url,  {}, null, data );
}
export function uploadLessonVideo(data, type, id) {
    let url = `/admin/api/${type}/upload/${id}`;
    return networkActions.requestUploadPostDirect(constants.uploadLessonVideo, url,  {}, null, data );
}