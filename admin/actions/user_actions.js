import * as constants from "../actionTypes";
import * as networkActions from './networkActions';


export function openUserModal(data){
    return {
        type: constants.openUserModal.REQUEST,
        json: data
    }
}
export function closeUserModal(){
    return {
        type: constants.closeUserModal.REQUEST,
    }
}
export function userChangeHandler(data){
    return {
        type: constants.userChangeHandler.REQUEST,
        json: data
    }
}
export function submitUser(data) {
    let url = `/admin/api/submitUser`;
    return networkActions.requestPost(constants.submitUser,url, data);
}
export function getUsers(data) {
    let url = `/admin/api/getUsers`;
    return networkActions.requestGet(constants.getUsers,url, data);
}
export function deleteUsers(data) {
    let url = `/admin/api/deleteUsers`;
    return networkActions.requestPost(constants.deleteUsers,url, data);
}

export function uploadUserAvatar(data, type, id) {
    let url = `/admin/api/${type}/upload/uploadUserAvatar/${id}`;
    return networkActions.requestUploadPostDirect(constants.uploadUserAvatar, url,  {}, null, data );
}