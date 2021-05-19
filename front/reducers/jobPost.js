import { getJobPost } from "../actionTypes";

const initialState = {
	jobposts: [],
	loadingJobPosts: false
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
		default:
			return state;
	}
};
