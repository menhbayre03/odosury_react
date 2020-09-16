import * as networkActions from './networkActions';
import * as constants from '../actionTypes';


export function register(data) {
    let url = `/api/register`;
    return networkActions.requestPost(constants.register, url, data);
}

export function login(data){
    let url = `/api/login`;
    return networkActions.requestPost(constants.login, url, data);
}