import { getPromoCode, submitPromoCode, deletePromoCode, restorePromoCode } from "../actionTypes";
import config from "../config";
const initialState = {
	promocodes: [],
	successPromoCode: false,
	submittingPromoCode: false,
	loadingPromoCode: false,
	deletingPromoCode: false,
	restoringPromoCode: false,
};
export default (state = initialState, action) => {
	switch (action.type) {
		case getPromoCode.REQUEST:
			return {
				...state,
				loadingPromoCode: true
			};
		case getPromoCode.RESPONSE:
			if (action.json.success) {
				return {
					...state,
					promocodes: action.json.promocodes,
					loadingPromoCode: false
				};
			} else {
				return {
					...state,
					loadingPromoCode: false
				};
			}
		case submitPromoCode.REQUEST:
			return {
				...state,
				submittingPromoCode: true
			};
		case submitPromoCode.RESPONSE:
			if (action.json.success) {
				return {
					...state,
					promocodes: [action.json.newPromoCode, ...state.promocodes],
					submittingPromoCode: false
				};
			} else {
				return {
					...state,
					submittingPromoCode: false
				};
			}
		case deletePromoCode.REQUEST:
			return {
				...state,
				deletingPromoCode: true
			};
		case deletePromoCode.RESPONSE:
			if (action.json.success) {
				// let a = state.promocodes.filter((c) => {
				// 	if (c._id === action.json.id) {
				// 		c.status = "delete";
				// 	}
				// 	return c.status !== "delete";
				// });
				return {
					...state,
					promocodes: state.promocodes.map(c => {
						if (c._id !== action.json.id) {
							return c
						} else {
							c.status = "delete"
							return c
						}
					}),
                    deletingPromoCode: false
				};
			} else {
				return {
					...state,
					promocodes: state.promocodes,
                    deletingPromoCode: false
				};
			}
		case restorePromoCode.REQUEST:
			return {
				...state,
				restoringPromoCode: true
			};
		case restorePromoCode.RESPONSE:
			if (action.json.success) {
				return {
					...state,
					promocodes: state.promocodes.map(c => {
						if(c._id !== action.json.id){
							return c
						} else {
							c.status = 'active'
							return c
						}
					}),
                    restoringPromoCode: false
				};
			} else {
				return {
					...state,
					promocodes: state.promocodes,
                    restoringPromoCode: false
				};
			}
		default:
			return state;
	}
};
