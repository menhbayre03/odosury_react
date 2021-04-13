import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function closePayment() {
    return {
        type: constants.closePayment.REQUEST
    }
}
export function openPayment(data) {
    return {
        type: constants.openPayment.REQUEST,
        json: data
    }
}
export function setStepPayment(data) {
    return {
        type: constants.setStepPayment.REQUEST,
        json: data
    }
}
export function setMethodPayment(data) {
    return {
        type: constants.setMethodPayment.REQUEST,
        json: data
    }
}
export function setPayment(data) {
    let url = `/api/set/payment`;
    return networkActions.requestPost(constants.setPayment, url, data);
}
export function setPaymentOld(data) {
    let url = `/api/set/payment`;
    return networkActions.requestPost(constants.setPaymentOld, url, data);
}
export function checkBankPayment(data) {
    let url = `/api/check/payment/bank`;
    return networkActions.requestPost(constants.checkBankPayment, url, data);
}
export function checkQpayPayment(data) {
    let url = `/api/check/payment/qpay`;
    return networkActions.requestPost(constants.checkQpayPayment, url, data);
}