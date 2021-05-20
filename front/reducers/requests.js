import { submitFeedback, submitTeacherRequest } from "../actionTypes";

const initialState = {
	feedback: [],
	teacherRequest: [],
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
				feedback: action.json.success
					? state.feedback.concat(action.json.newFeedback)
					: state.feedback,
				submittingFeedback: false,
				successFeedback: true,
			};
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
				successTeacherRequest: true,
			};
		default:
			return state;
	}
};
