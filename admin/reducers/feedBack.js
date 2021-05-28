import { getFeedback, deleteFeedback, completedFeedback } from "../actionTypes";

const initialState = {
	requests: [],
	gettingRequests: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case getFeedback.REQUEST:
			return {
				...state,
				gettingRequests: true
			};
		case getFeedback.RESPONSE:
			if (action.json.success) {
				return {
					...state,
					requests: action.json.requests,
					gettingRequests: false,
				};
			} else {
				return {
					...state,
					gettingRequests: false
				};
			}
		case deleteFeedback.REQUEST:
			return {
				...state
			};
		case deleteFeedback.RESPONSE:
            if (action.json.success) {
				let a = state.requests.filter((c) => {
					if (c._id === action.json.id) {
						c.status = "delete";
					}
					return c.status !== "delete";
				});
				return {
					...state,
					requests: a
				};
			} else {
				return {
					...state,
					requests: state.requests
				};
			}
			// return {
			// 	...state,
			// 	requests: state.requests.filter((c) => {
			// 		return c._id !== action.json.id;
			// 	})
			// };
		case completedFeedback.REQUEST:
			return {
				...state
			};
		case completedFeedback.RESPONSE:
			return {
				...state,
				requests: state.requests.filter((c) => {
                    if (action.json.success && c._id === action.json.id) {
                        c.status = action.json.status
                    }
                    return c
				})
			};
		default:
			return state;
	}
};
