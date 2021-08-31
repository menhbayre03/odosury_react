import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getTests(data) {
    let url = `/api/getTests`;
    return networkActions.requestGet(constants.getTests, url, data);
}
export function declineOpenTest(data, slug) {
    let url = `/api/declineOpenTest`;
    return networkActions.requestPost(constants.declineOpenTest, url, data);
}

export function getTest(slug) {
    let url = `/api/test/single/${slug}`;
    return networkActions.requestGet(constants.getTest, url)
}
export function componentWillUnmount() {
    return {
        type: constants.componentWillUnmountTest.REQUEST
    }
}