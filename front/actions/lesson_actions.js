import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getList(slug, data) {
    let url = `/api/list/${slug}`;
    return networkActions.requestGet(constants.getList, url, data);
}