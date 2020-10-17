import * as constants from "../actionTypes";
import * as networkActions from './networkActions';


export function getPayments(data = {}) {
    let url = `/admin/api/get/payments/all`;
    return networkActions.requestGet(constants.getPayments,url, data);
}