import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getBundle(slug) {
    let url = `/api/bundle/single/${slug}`;
    return networkActions.requestGet(constants.getBundle, url);
}
export function addToCard(data) {
    let url = `/api/bundle/add/to/card`;
    return networkActions.requestPost(constants.bundleAddToCard, url, data);
}
export function removeFromCard(data) {
    let url = `/api/bundle/remove/from/card`;
    return networkActions.requestPost(constants.bundleRemoveFromCard, url, data);
}