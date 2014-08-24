
var BEM = function(options) {
    options = options || {};

    this._options = options;

    this._options.elem = options.elem || '__';
    this._options.mod = options.mod || '_';
};

BEM.prototype.objects = require('./objects.js');
BEM.prototype.tree = require('./tree.js');
BEM.prototype.src = require('./src.js');
BEM.prototype.deps = require('./deps.js');
BEM.prototype.BEM = BEM;

module.exports = new BEM({
    elem: '__',
    mod: '_'
});
