import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getListAudio(slug, data) {
    let url = `/api/listAudio/${slug}`;
    return networkActions.requestGet(constants.getListAudio, url, data);
}
export function getAudio(slug,) {
    let url = `/api/audio/single/${slug}`;
    return networkActions.requestGet(constants.getAudio, url);
}
export function getViewAreaAudio(slug) {
    let url = `/api/audio/view/${slug}`;
    return networkActions.requestGet(constants.getViewAreaAudio, url);
}
export function setProgressAudio(lesson_id, program) {
    let url = `/api/audio/setProgram/${lesson_id}`;
    return networkActions.requestGet(constants.setProgressAudio, url, {program: program._id});
}
export function clearAudio() {
    return {
        type: constants.clearAudio.REQUEST
    }
}
export function rateAudio(lesson_id,data){
    let url = `/api/audio/rateAudio/${lesson_id}`;
    return networkActions.requestPost(constants.rateLesson,url,data)
}