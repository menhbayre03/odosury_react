import * as constants from "../actionTypes";
import * as networkActions from './networkActions';


export function openAudioCategoryModal(data){
    return {
        type: constants.openAudioCategoryModal.REQUEST,
        json: data
    }
}
export function closeAudioCategoryModal(){
    return {
        type: constants.closeAudioCategoryModal.REQUEST,
    }
}
export function audioCategoryChangeHandler(data){
    return {
        type: constants.audioCategoryChangeHandler.REQUEST,
        json: data
    }
}
export function submitAudioCategory(data) {
    let url = `/admin/api/submitAudioCategory`;
    return networkActions.requestPost(constants.submitAudioCategory,url, data);
}
export function getAudioCategory(data) {
    let url = `/admin/api/getAudioCategory`;
    return networkActions.requestGet(constants.getAudioCategory,url, data);
}
export function deleteAudioCategory(data) {
    let url = `/admin/api/deleteAudioCategory`;
    return networkActions.requestPost(constants.deleteAudioCategory,url, data);
}