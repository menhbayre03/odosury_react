import {
	getJobPost,
	submitJobPost,
	deleteJobPost,
	openJobSubmitDrawer,
	closeJobSubmitDrawer
} from "../actionTypes";
import config from "../config";
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
			if (action.json.success) {
				config.get("emitter").emit("submitJobDone");
				return {
					...state,
					jobposts: [action.json.newJobPost, ...state.jobposts],
					submittingJobPosts: false,
					drawerOpen: false
				};
			} else {
				return {
					...state,
					submittingJobPosts: false
				};
			}
			return {
				...state,
				jobposts: action.json.success
					? [action.json.newJobPost, ...state.jobposts]
					: state.jobposts,
				submittingJobPosts: false,
				drawerOpen: false
			};
		case openJobSubmitDrawer.REQUEST:
			return {
				...state,
				drawerOpen: true
			};
		case closeJobSubmitDrawer.REQUEST:
			return {
				...state,
				drawerOpen: false
			};
		case deleteJobPost.REQUEST:
			return {
				...state
			};
		case deleteJobPost.RESPONSE:
			if (action.json.success) {
				let a = state.jobposts.filter((c) => {
					if (c._id === action.json.id) {
						c.status = "delete";
					}
					return c.status !== "delete";
				});
				return {
					...state,
					jobposts: a
				};
			} else {
				return {
					...state,
					jobposts: state.jobposts
				};
			}
		default:
			return state;
	}
};
