var path = require('path');

module.exports = function getBemProperties(p) {
    var decl = {};
    var parts = path.dirname(p).split(path.sep);
    while (parts.length) {
        var part = parts.pop();
        if (part.indexOf('__') === 0) {
            decl.elem = part.slice(2);
        } else if (part[0] === '_') {
            decl.mod = part.slice(1);
        } else {
            decl.block = part;
            break;
        }
    }
    return decl;
};
