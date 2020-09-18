import * as constants from "../actionTypes";
import * as networkActions from './networkActions';


export function openCategoryModal(data){
    return {
        type: constants.openCategoryModal.REQUEST,
        json: data
    }
}
export function closeCategoryModal(){
    return {
        type: constants.closeCategoryModal.REQUEST,
    }
}
export function categoryChangeHandler(data){
    return {
        type: constants.categoryChangeHandler.REQUEST,
        json: data
    }
}
export function submitCategory(data) {
    let url = `/admin/api/submitCategory`;
    return networkActions.requestPost(constants.submitCategory,url, data);
}
export function getCategory(data) {
    let url = `/admin/api/getCategory`;
    return networkActions.requestGet(constants.getCategory,url, data);
}
export function deleteCategory(data) {
    let url = `/admin/api/deleteCategory`;
    return networkActions.requestPost(constants.deleteCategory,url, data);
}