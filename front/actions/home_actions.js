import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getHome() {
    let url = `/api/home/get`;
    return networkActions.requestGet(constants.register, url);
}