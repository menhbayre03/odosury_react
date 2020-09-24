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
// export function submitTeacher(data) {
//     let url = `/admin/api/submitTeacher`;
//     return networkActions.requestPost(constants.submitTeacher,url, data);
// }
// export function getTeachers(data) {
//     let url = `/admin/api/getTeachers`;
//     return networkActions.requestGet(constants.getTeachers,url, data);
// }
// export function deleteTeachers(data) {
//     let url = `/admin/api/deleteTeachers`;
//     return networkActions.requestPost(constants.deleteTeachers,url, data);
// }

export function uploadBundleThumbnail(data, type, id) {
    let url = `/uploadBundleThumbnail/image/upload`;
    return networkActions.uploadProgress(constants.uploadBundleThumbnail, url, data, type);
}