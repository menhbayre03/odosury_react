import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getTestSingle(data, id) {
    let url = `/api/getTestSingle/${id}`;
    return networkActions.requestGet(constants.getTestSingle, url, data);
}