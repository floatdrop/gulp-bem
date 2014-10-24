var graph = require('deps-graph');

var BEM = function(levels, options) {
    options = options || {};

    this._options = options;

    this._options.elem = options.elem || '__';
    this._options.mod = options.mod || '_';

    function stringsArray(array) {
        return array.reduce(function (prev, value) {
            return prev && typeof value === 'string';
        }, true);
    }

    if (!(Array.isArray(levels) && levels.length > 0 && stringsArray(levels)) && typeof levels !== 'string') {
        throw new Error('Invalid levels: expected to be string or array of strings, but got ' + levels + ' (' + (typeof levels) + ')');
    }

    return graph(levels);
};

BEM.prototype.src = require('./src.js');

module.exports = BEM;
