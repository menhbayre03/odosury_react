import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getLesson(slug) {
    let url = `/api/lesson/get/${slug}`;
    return networkActions.requestGet(constants.getLesson, url);
}