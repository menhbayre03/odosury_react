import * as constants from "../actionTypes";
import * as networkActions from './networkActions';


export function openKnowledgeCategoryModal(data){
    return {
        type: constants.openKnowledgeCategoryModal.REQUEST,
        json: data
    }
}
export function closeKnowledgeCategoryModal(){
    return {
        type: constants.closeKnowledgeCategoryModal.REQUEST,
    }
}
export function knowledgeCategoryChangeHandler(data){
    return {
        type: constants.knowledgeCategoryChangeHandler.REQUEST,
        json: data
    }
}
export function submitKnowledgeCategory(data) {
    let url = `/admin/api/submitKnowledgeCategory`;
    return networkActions.requestPost(constants.submitKnowledgeCategory,url, data);
}
export function getKnowledgeCategory(data) {
    let url = `/admin/api/getKnowledgeCategory`;
    return networkActions.requestGet(constants.getKnowledgeCategory,url, data);
}
export function deleteKnowledgeCategory(data) {
    let url = `/admin/api/deleteKnowledgeCategory`;
    return networkActions.requestPost(constants.deleteKnowledgeCategory,url, data);
}