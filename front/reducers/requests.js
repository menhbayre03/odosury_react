import { submitFeedback, submitTeacherRequest } from "../actionTypes";

const initialState = {
	feedbacks: [],
	teacherrequests: [],
	submittingFeedback: false,
	submittingTeacherRequest: false,
	successFeedback: false,
	successTeacherRequest: false
};
export default (state = initialState, action) => {
	switch (action.type) {
		case submitFeedback.REQUEST:
			return {
				...state,
				submittingFeedback: true
			};
		case submitFeedback.RESPONSE:
			return {
				...state,
				feedbacks: action.json.success
					? state.feedbacks.concat(action.json.newFeedback)
					: state.feedbacks,
				submittingFeedback: false
			};
		case submitTeacherRequest.REQUEST:
			return {
				...state,
				submittingTeacherRequest: true
			};
		case submitTeacherRequest.RESPONSE:
			return {
				...state,
				teacherrequests: action.json.success
					? state.teacherrequests.concat(action.json.newTeacherRequest)
					: state.teacherrequests,
				submittingTeacherRequest: false
			};
		default:
			return state;
	}
};
