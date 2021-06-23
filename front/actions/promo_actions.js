import * as networkActions from "./networkActions";
import * as constants from "../actionTypes";
export function validatePromoCode(data) {
	let url = `/api/validatePromoCode/`;
	return networkActions.requestPost(constants.validatePromoCode, url, data);
}
export function buyEishFree(data) {
	let url = `/api/buyEishFree/`;
	return networkActions.requestPost(constants.buyEishFree, url, data);
}
export function clearPromoCode() {
    return {
        type: constants.clearPromoCode.REQUEST
    }
}
