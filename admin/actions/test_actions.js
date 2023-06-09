import * as constants from "../actionTypes";
import * as networkActions from './networkActions';

// export function openUserModal(data){
//     return {
//         type: constants.openUserModal.REQUEST,
//         json: data
//     }
// }
// export function submitUser(data) {
//     let url = `/admin/api/submitUser`;
//     return networkActions.requestPost(constants.submitUser,url, data);
// }
// export function getUsers(data) {
//     let url = `/admin/api/getUsers`;
//     return networkActions.requestGet(constants.getUsers,url, data);
// }

export function getTest(data = {}){
    let url = `/admin/api/get/test`;
    return networkActions.requestPost(constants.getTest, url, data);
}export function getTests(data = {}){
    let url = `/admin/api/get/tests`;
    return networkActions.requestPost(constants.getTests, url, data);
}
export function createTest(data = {}){
    let url = `/admin/api/create/test`;
    return networkActions.requestPost(constants.createTest, url, data);
}
export function deleteTest(data = {}){
    let url = `/admin/api/delete/test`;
    return networkActions.requestPost(constants.deleteTest, url, data);
}
export function unpublishTest(data = {}){
    let url = `/admin/api/unpublish/test`;
    return networkActions.requestPost(constants.unpublishTest, url, data);
}
export function createQuestion(data = {}){
    let url = `/admin/api/create/question`;
    return networkActions.requestPost(constants.createQuestion, url, data);
}
export function deleteQuestion(data = {}){
    let url = `/admin/api/delete/question`;
    return networkActions.requestPost(constants.deleteQuestion, url, data);
}
export function publishTest(data = {}){
    let url = `/admin/api/publish/test`;
    return networkActions.requestPost(constants.publishTest, url, data);
}
export function publishQuestion(data = {}){
    let url = `/admin/api/publish/question`;
    return networkActions.requestPost(constants.publishQuestion, url, data);
}
export function unpublishQuestion(data = {}){
    let url = `/admin/api/unpublish/question`;
    return networkActions.requestPost(constants.unpublishQuestion, url, data);
}
export function getLessonsFromCategory(data = {}){
    let url = `/admin/api/get/category/lessons`;
    return networkActions.requestPost(constants.getLessonsFromCategory, url, data);
}
export function getTimelinesFromLessons(data = {}){
    let url = `/admin/api/get/lessons/timelines`;
    return networkActions.requestPost(constants.getTimelinesFromLessons, url, data);
}
export function chooseMedia(data){
    return {
        type: constants.chooseTestMedia.REQUEST,
        json: data
    }
}