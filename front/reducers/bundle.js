import {
	fetchBundles,
	fetchBundleSingle,
	fetchBundleLessons
} from "../actionTypes";
import config from "../config";
const initialState = {
	fetchingBundles: false,
	boughtBundles: [],
	notBoughtBundles: [],
	bundleSingle: {},
	fetchingBundleSingle: false,
	lessons: [],
	fetchingBundleLessons: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case fetchBundles.REQUEST:
			return {
				...state,
				fetchingBundles: true
			};
		case fetchBundles.RESPONSE:
			if (action.json.success) {
				console.log("actionjsonsuccess", action.json);
				return {
					...state,
					fetchingBundles: false,
					boughtBundles: action.json.bought,
					notBoughtBundles: action.json.notBought
					// notBoughtBundles: action.json.notBought
				};
			} else {
				config
					.get("emitter")
					.emit("warning", "Багцууд авчирахад алдаа гарлаа");
				return {
					...state,
					fetchingBundles: false
				};
			}
		case fetchBundleSingle.REQUEST:
			console.log("fetchBundleSingle reducer request");
			return {
				...state,
				fetchingBundleSingle: true
			};
		case fetchBundleSingle.RESPONSE:
			console.log("fetchBundleSingle reducer response", action.json);
			if (action.json.success) {
				return {
					...state,
					fetchingBundleSingle: false,
					bundleSingle: action.json.bundle
				};
			} else {
				config
					.get("emitter")
					.emit("warning", "Багц авчирахад алдаа гарлаа");
				return {
					...state,
					fetchingBundleSingle: false
				};
			}
		case fetchBundleLessons.REQUEST:
			console.log("fetchBundleLessons request");
			return {
				...state,
				fetchingBundleLessons: true
			};
		case fetchBundleLessons.RESPONSE:
			console.log("fetchBundleLessons response", action.json);
			if (action.json.success) {
				return {
					...state,
					fetchingBundleLessons: false,
					lessons: [...action.json.lessons]
				};
			} else {
				config
					.get("emitter")
					.emit("warning", "Хичээлүүдийг авчрахад алдаа гарлаа");
				return {
					...state,
					fetchingBundleLessons: false
				};
			}
		default:
			return state;
	}
};
