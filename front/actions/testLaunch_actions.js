import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getTest(data, slug) {
    let url = `/api/getTest/${slug}`;
    return networkActions.requestGet(constants.getTest, url, data);
}
// export function clearLesson() {
//     return {
//         type: constants.clearLesson.REQUEST
//     }
// }