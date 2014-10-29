var bemDeps = require('bem-deps');

var BEM = function(levels, options) {
    function stringsArray(array) {
        return array.reduce(function (prev, value) {
            return prev && typeof value === 'string';
        }, true);
    }

    if (!(Array.isArray(levels) && levels.length > 0 && stringsArray(levels)) && typeof levels !== 'string') {
        throw new Error('Invalid levels: expected to be string or array of strings, but got ' + levels + ' (' + (typeof levels) + ')');
    }

    return bemDeps(levels, options);
};

BEM.src = require('./src.js');

module.exports = BEM;
