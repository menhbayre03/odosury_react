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

config.formatMoney = function (amount, decimalCount = 0, decimal = ".", thousands = "'", sign = "") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) + sign : "");
    } catch (e) {
        console.log(e)
    }
};

export default config
