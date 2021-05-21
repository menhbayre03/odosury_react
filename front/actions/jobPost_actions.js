import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getJobPost() {
	let url = `/admin/api/getJobPost`;
	return networkActions.requestPost(constants.getJobPost, url);
}