import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function setCardTypes(data = {}) {
    return {
        type: constants.setCardTypes.REQUEST,
        data
    }
}
export function getQpay(data){
    let url = `/api/get/qpay`;
    return networkActions.requestPost(constants.getQpay, url, data);
}
export function setBank(data){
    let url = `/api/set/bank`;
    return networkActions.requestPost(constants.setBank, url, data);
}
export function payByBank(data){
    let url = `/api/get/bank`;
    return networkActions.requestPost(constants.payByBank, url, data);
}
export function checkQpay(data){
    let url = `/api/check/payment/qpay`;
    return networkActions.requestPost(constants.checkQpay, url, data);
}