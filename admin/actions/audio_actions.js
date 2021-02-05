import * as constants from "../actionTypes";
import * as networkActions from './networkActions';


export function openAudioModal(data){
    return {
        type: constants.openAudioModal.REQUEST,
        json: data
    }
}
export function closeAudioModal(){
    return {
        type: constants.closeAudioModal.REQUEST,
    }
}
export function audioChangeHandler(data){
    return {
        type: constants.audioChangeHandler.REQUEST,
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
export function submitAudio(data) {
    let url = `/admin/api/submitAudioBook`;
    return networkActions.requestPost(constants.submitAudio,url, data);
}
export function getAudios(data) {
    let url = `/admin/api/getAudioBooks`;
    return networkActions.requestGet(constants.getAudios,url, data);
}
export function deleteAudio(data) {
    let url = `/admin/api/deleteAudioBooks`;
    return networkActions.requestPost(constants.deleteAudio,url, data);
}
export function searchTeacher(data) {
    let url = `/admin/api/searchTeacher`;
    return networkActions.requestGet(constants.searchTeacher,url, data);
}
export function removeUploadedFile(data){
    return {
        type: constants.removeUploadedFileAudioEdit.REQUEST,
        json: data
    }
}
export function chooseMedia(data){
    return {
        type: constants.chooseMediaAudioEdit.REQUEST,
        json: data
    }
}
export function setFeatured(data){
    return {
        type: constants.setAudioFeatured.REQUEST,
        json: data
    }
}
