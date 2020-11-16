var {EventEmitter} = require('fbemitter');
let config = {};
let configList = {
    emitter: new EventEmitter(),
    host:process.env.NODE_ENV == 'development' ? 'http://odosury.mn' : 'https://odosury.com',
    hostMedia:process.env.NODE_ENV == 'development' ? 'http://cdn.odosury.mn' : 'https://cdn.odosury.com',
    socketUrl: process.env.NODE_ENV == 'development' ? 'http://odosury.mn:8080' : 'https://odosury.com',
    fbApi: {},
    socket: {},
};

config.config = function (data) {
    configList = {
        ...configList,
        ...data
    }
};

config.checkObjId = function(id){
    let checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    return checkForHexRegExp.test(id);
};

config.get = function (option) {
    return configList[option];
};

export const mnMonth = function(n) {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'][n];
};

export const mnDay = function(n) {
    return ['Дав', 'Мяг', 'Лха', 'Пү', 'Ба', 'Бя', 'Ня'][n];
};

export default config
