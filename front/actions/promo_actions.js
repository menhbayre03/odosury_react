import * as networkActions from "./networkActions";
import * as constants from "../actionTypes";
export function validatePromoCode(data) {
	let url = `/api/validatePromoCode/`;
	return networkActions.requestPost(constants.validatePromoCode, url, data);
}
