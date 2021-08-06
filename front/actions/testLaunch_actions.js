import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getTest(data, slug) {
    let url = `/api/getTest/${slug}`;
    return networkActions.requestGet(constants.getTest, url, data);
}
export function postAnswers(data) {
    let url = `/api/postAnswers`;
    return networkActions.requestPost(constants.postAnswers, url, data);
}
export function selectedAnswer(data) {
    return {
        type: constants.selectedAnswer.REQUEST,
        json: data
    }
}