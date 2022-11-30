import * as constants from "../actionTypes";
import * as networkActions from "./networkActions";

export function fetchPartners() {
	let url = `/admin/api/partner/fetchPartners`;
	return networkActions.requestGet(constants.fetchPartners, url);
}
export function fetchBatches(data) {
	let url = `/admin/api/partner/fetchBatches`;
	return networkActions.requestGet(constants.fetchBatches, url, data);
}
export function fetchCodes(data) {
	let url = `/admin/api/partner/fetchCodes`;
	return networkActions.requestGet(constants.fetchCodes, url, data);
}
export function deletePartner(data) {
	let url = `/admin/api/partner/deletePartner`;
	return networkActions.requestPost(constants.deletePartner, url, data);
}
export function deleteBatch(data) {
	let url = `/admin/api/partner/deleteBatch`;
	return networkActions.requestPost(constants.deleteBatch, url, data);
}
export function submitPartner(data) {
	let url = `/admin/api/partner/submitPartner`;
	return networkActions.requestPost(constants.submitPartner, url, data);
}
export function submitBatch(data) {
	let url = `/admin/api/partner/submitBatch`;
	return networkActions.requestPost(constants.submitBatch, url, data);
}
export function togglePartnerDrawer() {
	return {
		type: constants.togglePartnerDrawer.REQUEST
	};
}
export function togglePartnerModal() {
	return {
		type: constants.togglePartnerModal.REQUEST
	};
}
export function clearCodes() {
	return {
		type: constants.clearCodes.REQUEST
	};
}
