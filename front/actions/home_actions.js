import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getHome() {
    let url = `/api/home/get`;
    return networkActions.requestGet(constants.getHome, url);
}
export function setBank() {
    let url = `/api/set/bank/premium`;
    return networkActions.requestGet(constants.setBankForPremium, url);
}
export function setPremiumModal(data){
    return {
        type: constants.setPremiumModal.REQUEST,
        data
    }
}