import { bindActionCreators } from "redux";
import { submitFeedback, submitTeacherRequest, validatePromoCode, clearPromoCode, buyEishFree } from "../actionTypes";

const initialState = {
	feedback: [],
	teacherRequest: [],
	submittingFeedback: false,
	submittingTeacherRequest: false,
	successFeedback: false,
	successTeacherRequest: false,
	validatingPromoCode: false,
	promoIsValid: false,
	appliedCode: '',
	appliedDiscount: 0,
	buyingEishFree: false,
	buyEishFreeSuccess: false
};
export default (state = initialState, action) => {
	switch (action.type) {
		case submitFeedback.REQUEST:
			return {
				...state,
				submittingFeedback: true
			};
		case submitFeedback.RESPONSE:
			if (action.json.success) {
				return {
					...state,
					feedback: action.json.success
						? state.feedback.concat(action.json.newFeedback)
						: state.feedback,
					submittingFeedback: false,
					successFeedback: true
				};
			} else {
				return {
					...state,
					submittingFeedback: false
				};
			}

		case submitTeacherRequest.REQUEST:
			return {
				...state,
				submittingTeacherRequest: true
			};
		case submitTeacherRequest.RESPONSE:
			return {
				...state,
				teacherRequest: action.json.success
					? state.teacherRequest.concat(action.json.newTeacherRequest)
					: state.teacherRequest,
				submittingTeacherRequest: false,
				successTeacherRequest: true
			};
		case validatePromoCode.REQUEST:
			return {
				...state,
				validatingPromoCode: true,
			}
		case validatePromoCode.RESPONSE:
			if (action.json.success) {
				return {
					...state,
					promoIsValid: true,
					appliedCode: action.json.appliedCode,
					appliedDiscount: action.json.appliedDiscount,
					promocode: action.json.promocode,
					validatingPromoCode: false,
				}
			} else {
				return {
					...state,
					validatingPromoCode: false
				}
			}
		case clearPromoCode.REQUEST:
			return {
				...state,
				validatingPromoCode: false,
				promoIsValid: false,
				appliedCode: '',
				appliedDiscount: 0,
			}
		case buyEishFree.REQUEST:
			return {
				...state,
				buyingEishFree: true
			}
		case buyEishFree.RESPONSE:
			if (action.json.success) {
				return {
					...state,
					buyEishFreeSuccess: true,
					buyingEishFree: false
				}
			} else {
				return {
					...state,
					buyingEishFree: false
				}
			}
		default:
			return state;
	}
};
