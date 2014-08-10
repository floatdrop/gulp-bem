var path = require('path');

module.exports = function getBemProperties(p) {
    var deps = {};
    var parts = path.dirname(p).split(path.sep);
    while (parts.length) {
        var part = parts.pop();
        if (part.indexOf('__') === 0) {
            deps.elem = part.slice(2);
        } else if (part[0] === '_') {
            deps.mod = part.slice(1);
        } else {
            deps.block = part;
            break;
        }
    }
    return deps;
};
