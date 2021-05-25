import * as constants from "../actionTypes";
import * as networkActions from './networkActions';


export function getPayments(data = {}) {
    let url = `/admin/api/get/payments/all`;
    return networkActions.requestGet(constants.getPayments,url, data);
}
export function setPaymentStatus(payment_id, typo) {
    let url = `/admin/api/set/payment`;
    return networkActions.requestGet(constants.setPaymentStatus,url, {payment_id: payment_id, typo: typo});
}
export function onSaveTrans(data) {
    let url = `/admin/api/add/payment`;
    return networkActions.requestPost(constants.onSaveTrans,url, data);
}
export function searchUser(data) {
    let url = `/admin/api/search/user`;
    return networkActions.requestGet(constants.searchUser,url, data);
}
export function onCancelTrans(){
    return {
        type: constants.onCancelTrans.REQUEST,
    }
}
export function openModal(){
    return {
        type: constants.openModalTrans.REQUEST,
    }
}
export function changeHandler(data){
    return {
        type: constants.changeHandlerPaymentUser.REQUEST,
        data
    }
}