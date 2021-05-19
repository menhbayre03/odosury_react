import { getJobPost, submitJobPost, deleteJobPost, openJobSubmitDrawer, closeJobSubmitDrawer } from "../actionTypes";

const initialState = {
	jobposts: [],
	successJobPosts: false,
	submittingJobPosts: false,
	loadingJobPosts: false,
	submitModalShow: false 
};
export default (state = initialState, action) => {
	switch (action.type) {
		case getJobPost.REQUEST:
			return {
				...state,
				loadingJobPosts: true
			};
		case getJobPost.RESPONSE:
			if (action.json.success) {
				return {
					...state,
					jobposts: action.json.jobposts,
					loadingJobPosts: false
				};
			} else {
				return {
					...state,
					loadingJobPosts: false
				};
			}
		case submitJobPost.REQUEST:
			return {
				...state,
				submittingJobPosts: true
			};
		case submitJobPost.RESPONSE:
			return {
				...state,
				jobposts: action.json.success
					? state.jobposts.concat(action.json.newJobPost)
					: state.jobposts,
				submittingJobPosts: false,
				opening:'',
				requirements:'',
				salary:'',
				misc:'',
				successJobPosts: true,
			};
		default:
			return state
	}
};
