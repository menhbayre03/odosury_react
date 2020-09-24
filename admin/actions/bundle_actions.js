import * as constants from "../actionTypes";
import * as networkActions from './networkActions';


export function openBundleModal(data){
    return {
        type: constants.openBundleModal.REQUEST,
        json: data
    }
}
export function closeBundleModal(){
    return {
        type: constants.closeBundleModal.REQUEST,
    }
}
export function bundleChangeHandler(data){
    return {
        type: constants.bundleChangeHandler.REQUEST,
        json: data
    }
}
export function bundleLevelOnChange(data){
    return {
        type: constants.bundleLevelOnChange.REQUEST,
        json: data
    }
}
export function addLessonToBundleLevels(data){
    return {
        type: constants.addLessonToBundleLevels.REQUEST,
        json: data
    }
}
export function addBundleLevel(data){
    return {
        type: constants.addBundleLevel.REQUEST,
        json: data
    }
}
export function submitBundle(data) {
    let url = `/admin/api/submitBundle`;
    return networkActions.requestPost(constants.submitBundle,url, data);
}
export function getBundle(data) {
    let url = `/admin/api/getBundle`;
    return networkActions.requestGet(constants.getBundle,url, data);
}
// export function deleteTeachers(data) {
//     let url = `/admin/api/deleteTeachers`;
//     return networkActions.requestPost(constants.deleteTeachers,url, data);
// }

export function uploadBundleThumbnail(data, type, id) {
    let url = `/uploadBundleThumbnail/image/upload`;
    return networkActions.uploadProgress(constants.uploadBundleThumbnail, url, data, type);
}