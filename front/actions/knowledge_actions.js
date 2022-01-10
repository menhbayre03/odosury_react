import * as networkActions from './networkActions';
import * as constants from '../actionTypes';

export function getKnowledge(slug, knowledge_id, data) {
    let url = `/api/knowledge/${slug}/${knowledge_id}`;
    return networkActions.requestGet(constants.getKnowledge, url);
}
