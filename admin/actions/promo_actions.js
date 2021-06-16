import * as constants from "../actionTypes";
import * as networkActions from "./networkActions";

export function submitPromoCode(data) {
    let url = `/admin/api/submitPromoCode`
    return networkActions.requestPost(constants.submitPromoCode, url, data);
}
export function getPromoCode() {
    let url = `/admin/api/getPromoCode`
    return networkActions.requestPost(constants.getPromoCode, url);
}
export function deletePromoCode(data) {
    let url = `/admin/api/deletePromoCode`
    return networkActions.requestPost(constants.deletePromoCode, url, data);
}