import * as constants from "../actionTypes";
import * as networkActions from "./networkActions";

export function submitPromoCode(data) {
    let url = `/admin/api/submitPromoCode`
    return networkActions.requestPost(constants.submitPromoCode, url, data);
}
export function getPromoCode() {
    let url = `/admin/api/getPromoCode`
    return networkActions.requestGet(constants.getPromoCode, url);
}
export function deletePromoCode(data) {
    let url = `/admin/api/deletePromoCode`
    return networkActions.requestPost(constants.deletePromoCode, url, data);
}
export function restorePromoCode(data) {
    let url = `/admin/api/restorePromoCode`
    return networkActions.requestPost(constants.restorePromoCode, url, data);
}