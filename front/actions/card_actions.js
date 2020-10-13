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