import * as constants from "../actionTypes";
import * as networkActions from './networkActions';

export function getLessonSingle(data) {
    let url = `/admin/api/getLessonSingle`;
    return networkActions.requestGet(constants.getLessonSingle,url, data);
}
export function deleteLevel(data) {
    let url = `/admin/api/deleteLevel`;
    return networkActions.requestPost(constants.deleteLevel,url, data);
}
export function removeTimeline(data) {
    let url = `/admin/api/removeTimeline`;
    return networkActions.requestPost(constants.removeTimeline,url, data);
}
export function openLessonModalLevel(data){
    return {
        type: constants.openLessonModalLevel.REQUEST,
        json: data
    }
}
export function closeModalLevelTimline(){
    return {
        type: constants.closeModalLevelTimline.REQUEST
    }
}
export function openModalLevelTimline(data){
    return {
        type: constants.openModalLevelTimline.REQUEST,
        json: data
    }
}
export function openEditTimeline(data){
    let url = `/admin/api/openEditTimeline`;
    return networkActions.requestGet(constants.openEditTimeline,url, data);
}
export function closeEditTimeline(data){
    return {
        type: constants.closeEditTimeline.REQUEST,
        json: data
    }
}
export function closeLessonModalLevel(){
    return {
        type: constants.closeLessonModalLevel.REQUEST
    }
}
export function lessonChangeHandlerLevel(data){
    return {
        type: constants.lessonChangeHandlerLevel.REQUEST,
        json: data
    }
}
export function onChangeHandlerLevelTimelineSelect(data){
    return {
        type: constants.onChangeHandlerLevelTimelineSelect.REQUEST,
        json: data
    }
}
export function submitTimeline(data){
    let url = `/admin/api/submitTimeline`;
    return networkActions.requestPost(constants.submitTimeline,url, data);
}
export function onChangeHandlerLevelTimeline(data){
    return {
        type: constants.onChangeHandlerLevelTimeline.REQUEST,
        json: data
    }
}
export function removeUploadedFile(data){
    return {
        type: constants.removeUploadedFile.REQUEST,
        json: data
    }
}
export function orderLevels(data){
    let url = `/admin/api/orderLevels`;
    return networkActions.requestPost(constants.orderLevels,url, data);
    // return {
    //     type: constants.orderLevels.REQUEST,
    //     json: data
    // }
}
export function chooseMedia(data){
    return {
        type: constants.chooseMedia.REQUEST,
        json: data
    }
}
export function lessonAddLevel(data){
    let url = `/admin/api/lessonAddLevel`;
    return networkActions.requestPost(constants.lessonAddLevel,url, data);
}
export function uploadTimelineVideo(data, type, id) {
    let url = `/video/upload`;
    return networkActions.uploadProgress(constants.uploadTimelineVideo, url, data, type );
}
export function uploadTimelineAudio(data, type, id) {
    let url = `/audio/upload`;
    return networkActions.uploadProgress(constants.uploadTimelineAudio, url, data, type );
}
export function uploadTimelineFile(data, type, id) {
    let url = `/file/upload`;
    return networkActions.uploadProgress(constants.uploadTimelineFile, url, data, type );
}