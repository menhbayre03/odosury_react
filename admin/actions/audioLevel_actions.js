import * as constants from "../actionTypes";
import * as networkActions from './networkActions';

export function getAudioSingle(data) {
    let url = `/admin/api/getAudioBookSingle`;
    return networkActions.requestGet(constants.getAudioSingle,url, data);
}
// export function deleteLevel(data) {
//     let url = `/admin/api/deleteLevel`;
//     return networkActions.requestPost(constants.deleteLevel,url, data);
// }
export function removeTimeline(data) {
    let url = `/admin/api/removeAudioTimeline`;
    return networkActions.requestPost(constants.removeAudioTimeline,url, data);
}
// export function openLessonModalLevel(data){
//     return {
//         type: constants.openLessonModalLevel.REQUEST,
//         json: data
//     }
// }
// export function closeModalLevelTimline(){
//     return {
//         type: constants.closeModalLevelTimline.REQUEST
//     }
// }
// export function openModalLevelTimline(data){
//     return {
//         type: constants.openModalLevelTimline.REQUEST,
//         json: data
//     }
// }
export function openEditTimeline(data){
    if(data.type === 'new') {
        return {
            type: constants.openEditAudioTimeline.RESPONSE,
            json: data
        }
    } else {
        let url = `/admin/api/openEditAudioTimeline`;
        return networkActions.requestGet(constants.openEditAudioTimeline,url, data);
    }
}
export function closeEditTimeline(data){
    return {
        type: constants.closeEditTimelineAudio.REQUEST,
        json: data
    }
}
// export function closeLessonModalLevel(){
//     return {
//         type: constants.closeLessonModalLevel.REQUEST
//     }
// }
// export function lessonChangeHandlerLevel(data){
//     return {
//         type: constants.lessonChangeHandlerLevel.REQUEST,
//         json: data
//     }
// }
// export function onChangeHandlerLevelTimelineSelect(data){
//     return {
//         type: constants.onChangeHandlerLevelTimelineSelect.REQUEST,
//         json: data
//     }
// }
export function submitTimeline(data){
    let url = `/admin/api/submitAudioTimeline`;
    return networkActions.requestPost(constants.submitTimelineAudio,url, data);
}
export function onChangeHandlerLevelTimeline(data){
    return {
        type: constants.onChangeHandlerLevelTimelineAudio.REQUEST,
        json: data
    }
}
export function removeUploadedFile(data){
    return {
        type: constants.removeUploadedFileAudio.REQUEST,
        json: data
    }
}
export function orderLevels(data){
    let url = `/admin/api/orderLevelsAudio`;
    return networkActions.requestPost(constants.orderLevelsAudio,url, data);
}
export function chooseMedia(data){
    return {
        type: constants.chooseMediaAudio.REQUEST,
        json: data
    }
}
// export function lessonAddLevel(data){
//     let url = `/admin/api/lessonAddLevel`;
//     return networkActions.requestPost(constants.lessonAddLevel,url, data);
// }
// export function uploadTimelineVideo(data, type, id) {
//     let url = `/video/upload`;
//     return networkActions.uploadProgress(constants.uploadTimelineVideo, url, data, type );
// }
// export function uploadTimelineAudio(data, type, id) {
//     let url = `/audio/upload`;
//     return networkActions.uploadProgress(constants.uploadTimelineAudio, url, data, type );
// }
// export function uploadTimelineFile(data, type, id) {
//     let url = `/file/upload`;
//     return networkActions.uploadProgress(constants.uploadTimelineFile, url, data, type );
// }