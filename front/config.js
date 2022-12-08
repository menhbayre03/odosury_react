var { EventEmitter } = require("fbemitter");
let config = {};
let configList = {
    emitter: new EventEmitter(),
    host: process.env.NODE_ENV == "development" ? "http://odosury.mn" : "https://odosury.com",
    hostMedia:
        process.env.NODE_ENV == "development" ? "http://odosury.mn/" : "https://odosury.com/",
};
let alphabet = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
    K: 11,
    L: 12,
    M: 13,
    N: 14,
    O: 15,
    P: 16,
    Q: 17,
    R: 18,
    S: 19,
    T: 20,
    U: 21,
    V: 22,
    W: 23,
    X: 24,
    Y: 25,
    Z: 26,
};

config.lton = function (l) {
    // l[0]*26^n + l[1]*26^(n-1) + ... l[l.length - 1]*26^(0) + 26^(n-1) + ... + 26^1
    var n = l.length;
    var o = 0;

    for (var i = 0; i < n; i++) {
        o += (alphabet[l[i].toUpperCase()] || l[i]) * Math.pow(26, n - i - 1);
        if (i > 0) o += Math.pow(26, n - i);
    }
    return o;
};
config.config = function (data) {
    configList = {
        ...configList,
        ...data,
    };
};
config.get = function (option) {
    return configList[option];
};

config.formatMoney = function (
    amount,
    decimalCount = 0,
    decimal = ".",
    thousands = "'",
    sign = ""
) {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
            negativeSign +
            (j ? i.substr(0, j) + thousands : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount
                ? decimal +
                  Math.abs(amount - i)
                      .toFixed(decimalCount)
                      .slice(2) +
                  sign
                : "")
        );
    } catch (e) {
        console.log(e);
    }
};

export function resultToLetter(num) {
    let res = "";
    if (num >= 90) {
        res = "A";
    } else if (num >= 80) {
        res = "B";
    } else if (num >= 70) {
        res = "C";
    } else if (num >= 60) {
        res = "D";
    } else {
        res = "F";
    }
    return res;
}

export default config;
