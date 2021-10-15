import {
	fetchPartners,
	fetchBatches,
	fetchCodes,
	deletePartner,
	deleteBatch,
	submitPartner,
	submitBatch,
	togglePartnerDrawer,
	togglePartnerModal
} from "../actionTypes";
import config from "../config";
const initialState = {
	partners: [],
	batches: [],
	codes: [],
	fetchingPartners: false,
	fetchingBatches: false,
	fetchingCodes: false,
	deletingPartner: false,
	deletingBatch: false,
	submittingPartner: false,
	submittingBatch: false,
	successBatch: false,
	drawerOpen: false,
	modalOpen: false
};
export default (state = initialState, action) => {
	switch (action.type) {
		case fetchPartners.REQUEST:
			return {
				...state,
				fetchingPartners: true
			};
		case fetchPartners.RESPONSE:
			if (action.json.success) {
				return {
					...state,
					partners: action.json.partners,
					fetchingPartners: false
				};
			} else {
				// config
				// 	.get("emitter")
				// 	.emit("warning", "Хамтрагчдийг авчрахаад алдаа гарлаа");
				return {
					...state,
					fetchingPartners: false
				};
			}
		case fetchBatches.REQUEST:
			return {
				...state,
				fetchingBatches: true
			};
		case fetchBatches.RESPONSE:
			console.log("fetchBatches response", action.json);
			if (action.json.success) {
				return {
					...state,
					batches: action.json.batches,
					fetchingBatches: false
				};
			} else {
				// config
				// 	.get("emitter")
				// 	.emit("warning", "Багц авчрахад алдаа гарлаа");
				return {
					...state,
					fetchingBatches: false
				};
			}
		case fetchCodes.REQUEST:
			return {
				...state,
				fetchingCodes: true
			};
		case fetchCodes.RESPONSE:
			if (action.json.success) {
				return {
					...state,
					codes: action.json.codes,
					fetchingCodes: false
				};
			} else {
				config
					.get("emitter")
					.emit("warning", "Багц авчрахад алдаа гарлаа");
				return {
					...state,
					fetchingCodes: false
				};
			}
		case deletePartner.REQUEST:
			return {
				...state,
				deletingPartner: true
			};
		case deletePartner.RESPONSE:
			if (action.json.success) {
				return {
					...state,
					partner: state.partners.filter(
						(e) => e._id !== action.json.deleted._id
					),
					deletingPartner: false
				};
			} else {
				config.get("emitter").emit("warning", "Устгахад алдаа гарлаа");
				return {
					...state,
					deletingPartner: false
				};
			}
		case deleteBatch.REQUEST:
			return {
				...state,
				deletingBatch: true
			};
		case deleteBatch.RESPONSE:
			if (action.json.success) {
				config
					.get("emitter")
					.emit("success", "Коднууд амжилттай үүслээ");
				return {
					...state,
					batch: state.batches.filter(
						(e) => e._id !== action.json.deleted._id
					),
					deletingBatch: false
				};
			} else {
				config.get("emitter").emit("warning", "Устгахад алдаа гарлаа");
				return {
					...state,
					deletingBatch: false
				};
			}
		case submitPartner.REQUEST:
			return {
				...state,
				submittingPartner: true
			};
		case submitPartner.RESPONSE:
			if (action.json.success) {
				config.get("emitter").emit("success", "Амжилттай нэмэгдлээ");
				return {
					...state,
					partners: [...state.partners, action.json.newPartner],
					submittingPartner: false,
					modalOpen: false
				};
			} else {
				config
					.get("emitter")
					.emit("warning", "Шинээр хадгалахад алдаа гарлаа");
				return {
					...state,
					submittingPartner: false,
					modalOpen: false
				};
			}
		case submitBatch.REQUEST:
			console.log("partner red submitBatch");
			return {
				...state,
				submittingBatch: true
			};
		case submitBatch.RESPONSE:
			console.log("partner red response", action.json);
			if (action.json.success) {
				return {
					...state,
					batches: [...state.batches, action.json.batch],
					submittingBatch: false,
					successBatch: true
				};
			} else {
				config
					.get("emitter")
					.emit("warning", "Шинээр хадгалахад алдаа гарлаа");
				return {
					...state,
					submittingBatch: false
				};
			}
		case togglePartnerDrawer.REQUEST:
			return {
				...state,
				drawerOpen: !state.drawerOpen
			};
		case togglePartnerModal.REQUEST:
			return {
				...state,
				modalOpen: !state.modalOpen
			};
		default:
			return state;
	}
};
