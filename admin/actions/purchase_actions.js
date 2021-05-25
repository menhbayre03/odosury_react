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
    return networkActions.requestGet(constants.onSaveTrans,url, data);
}
export function onCancelTrans(){
    return {
        type: constants.onCancelTrans.REQUEST,
    }
}