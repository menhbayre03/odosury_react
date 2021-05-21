import * as constants from "../actionTypes";
import * as networkActions from "./networkActions";

export function submitJobPost(data) {
	let url = `/admin/api/submitJobPost`;
	return networkActions.requestPost(constants.submitJobPost, url, data);
}
export function getJobPost() {
	let url = `/admin/api/getJobPost`;
	return networkActions.requestPost(constants.getJobPost, url);
}
export function openJobSubmitDrawer() {
	return {
		type: constants.openJobSubmitDrawer.REQUEST
	}
}
export function closeJobSubmitDrawer() {
	return {
		type: constants.closeJobSubmitDrawer.REQUEST
	}
}
export function deleteJobPost(data) {
	let url = `/admin/api/deleteJobPost`;
	return networkActions.requestPost(constants.deleteJobPost, url, data);
}