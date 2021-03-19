import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getList(data) {
    let url = `/api/listEish`;
    return networkActions.requestGet(constants.getListEish, url, data);
}
