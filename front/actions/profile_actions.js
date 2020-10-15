import * as networkActions from './networkActions';
import * as constants from '../actionTypes';


export function getHistory(id) {
    let url = `/api/profileHistory/${id}`;
    return networkActions.requestGet(constants.getHistory, url);
}

export function getLessonsProf(id) {
    let url = `/api/profileLessons/${id}`;
    return networkActions.requestGet(constants.getLessonsProf, url);
}
