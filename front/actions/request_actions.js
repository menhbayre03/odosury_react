import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function submitTeacherRequest(data) {
    let url = `/api/teacher/register`;
    return networkActions.requestPost(constants.submitTeacherRequest, url, data);
}
export function submitFeedback(data) {
    let url = `/api/feedback`;
    return networkActions.requestPost(constants.submitFeedback, url, data);
}