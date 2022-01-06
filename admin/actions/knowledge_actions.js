import * as constants from "../actionTypes";
import * as networkActions from './networkActions';


export function getKnowledge(data) {
    let url = `/admin/api/getKnowledge`;
    return networkActions.requestGet(constants.getKnowledge,url, data);
}
// ** knowledge
export function submitKnowledge(data) {
    let url = `/admin/api/submitKnowledge`;
    return networkActions.requestPost(constants.submitKnowledge,url, data);
}
export function openKnowledgeModal(data){
    return {
        type: constants.openKnowledgeModal.REQUEST,
        json: data
    }
}
export function closeKnowledgeModal(){
    return {
        type: constants.closeKnowledgeModal.REQUEST,
    }
}
export function knowledgeChangeHandler(data){
    return {
        type: constants.knowledgeChangeHandler.REQUEST,
        json: data
    }
}
export function deleteKnowledge(data) {
    let url = `/admin/api/deleteKnowledge`;
    return networkActions.requestPost(constants.deleteKnowledge,url, data);
}

export function uploadKnowledgeImage(files ,data = {type: 'image'}){
    return networkActions.uploadProgressMediaLib(constants.uploadKnowledgeImage,files, data.type, data)
}
export function uploadKnowledgeAudio(files ,data = {type: 'audio'}){
    return networkActions.uploadProgressMediaLib(constants.uploadKnowledgeAudio,files, data.type, data)
}


// ** unmount
export function unmountAdminKnowledges(){
    return {
        type: constants.unmountAdminKnowledges.REQUEST,
    }
}


