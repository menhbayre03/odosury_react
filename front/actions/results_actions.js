import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getResults(data) {
    let url = `/api/getResults`;
    return networkActions.requestGet(constants.getResults, url, data);
}