import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getList(slug, data) {
    let url = `/api/list/${slug}`;
    return networkActions.requestGet(constants.getList, url, data);
}
export function getLesson(slug,) {
    let url = `/api/lesson/single/${slug}`;
    return networkActions.requestGet(constants.getLesson, url);
}
export function getViewArea(slug) {
    let url = `/api/lesson/view/${slug}`;
    return networkActions.requestGet(constants.getViewArea, url);
}
export function addToCard(data) {
    let url = `/api/lesson/add/to/card`;
    return networkActions.requestPost(constants.lessonAddToCard, url, data);
}
export function removeFromCard(data) {
    let url = `/api/lesson/remove/from/card`;
    return networkActions.requestPost(constants.lessonRemoveFromCard, url, data);
}