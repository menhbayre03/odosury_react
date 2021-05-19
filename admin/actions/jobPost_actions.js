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
export function openJobSubmitDrawer(data) {
	return {
		type: constants.openJobSubmitDrawer.REQUEST,
		json: data
	}
}
export function closeJobSubmitDrawer() {
	return {
		type: constants.closeJobSubmitDrawer.REQUEST
	}
}