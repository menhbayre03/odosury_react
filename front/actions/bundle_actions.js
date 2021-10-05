import * as networkActions from "./networkActions";
import * as constants from "../actionTypes";

export function fetchBundles() {
	let url = `/api/fetchBundles`;
	return networkActions.requestPost(constants.fetchBundles, url);
}
export function fetchBundleSingle(id) {
	console.log("fetchBundleSingle action hit", id);
	let url = `/api/fetchBundleSingle/${id}`;
	return networkActions.requestPost(constants.fetchBundleSingle, url);
}
export function fetchBundleLessons(arr) {
	console.log("fetchBundleLessons action hit", arr);
	let url = `/api/fetchBundleLessons/`;
	return networkActions.requestGet(constants.fetchBundleLessons, url, arr);
}
