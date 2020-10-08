import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getBundle(slug) {
    let url = `/api/bundle/single/${slug}`;
    return networkActions.requestGet(constants.getBundle, url);
}