/*
    This code is part of Remedial Javascript by Douglas Crockford
    http://javascript.crockford.com/remedial.html
*/

module.exports = function supplant (o) {
    return function (str) {
        return str.replace(/{([^{}]*)}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };
};
