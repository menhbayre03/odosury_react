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
export function setProgress(lesson_id, program) {
    let url = `/api/lesson/setProgram/${lesson_id}`;
    return networkActions.requestGet(constants.setProgress, url, {program: program._id});
}
export function addWish(id, data) {
    let url = `/api/lesson/addWish/${id}`;
    return networkActions.requestGet(constants.addWish, url, data);
}
export function clearLesson() {
    return {
        type: constants.clearLesson.REQUEST
    }
}