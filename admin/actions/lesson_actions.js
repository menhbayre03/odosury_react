import * as constants from "../actionTypes";
import * as networkActions from './networkActions';

export function getLesson() {
    let url = `/dashboard/api/lesson/`;
    return networkActions.requestGet(constants.getLesson,url);
}