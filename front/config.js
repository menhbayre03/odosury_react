var {EventEmitter} = require('fbemitter');
let config = {};
let configList = {
    emitter: new EventEmitter(),
    host:process.env.NODE_ENV == 'development' ? 'http://odosury.mn' : 'https://odosury.com',
    hostMedia:process.env.NODE_ENV == 'development' ? 'http://cdn.odosury.mn' : 'https://cdn.odosury.com',
};
config.config = function (data) {
    configList = {
        ...configList,
        ...data
    }
};
config.get = function (option) {
    return configList[option];
};

config.printMoney = function(val){
    let amount = '';
    let StrAmount = String(val).split("").reverse().join("");
    for(let i = 1; i <= StrAmount.length; i++){
        amount += StrAmount[i - 1];
        if(i != 0 && (i % 3) == 0 && StrAmount.length != i){
            amount += ',';
        }
    }
    return amount.split("").reverse().join("");
};

export default config
