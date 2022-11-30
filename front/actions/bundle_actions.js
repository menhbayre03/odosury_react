import * as networkActions from "./networkActions";
import * as constants from "../actionTypes";

export function fetchBundles() {
	let url = `/api/fetchBundles`;
	return networkActions.requestPost(constants.fetchBundles, url);
}
export function fetchBundleSingle(id) {
	let url = `/api/fetchBundleSingle/${id}`;
	return networkActions.requestPost(constants.fetchBundleSingle, url);
}
export function fetchBundleLessons(arr) {
	let url = `/api/fetchBundleLessons/`;
	return networkActions.requestGet(constants.fetchBundleLessons, url, arr);
}
