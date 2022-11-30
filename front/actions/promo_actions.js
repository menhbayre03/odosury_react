import * as networkActions from "./networkActions";
import * as constants from "../actionTypes";
export function validatePromoCode(data) {
	let url = `/api/partner/verifyCode/`;
	return networkActions.requestPost(constants.validatePromoCode, url, data);
}
// export function validatePromoCode(data) {
// 	console.log('promo actions validate hit', data);
// 	let url = `/api/validatePromoCode/`;
// 	return networkActions.requestPost(constants.validatePromoCode, url, data);
// }
export function clearPromoCode() {
	return {
		type: constants.clearPromoCode.REQUEST
	};
}
