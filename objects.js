var stream = require('bem-object').stream;
var read = require('multistream');

function objects(levels, options) {
    if (levels && !Array.isArray(levels) && typeof levels === 'object') {
        levels = process.cwd();
        options = levels;
    }

    options = options || {};

    options.elem = options.elem || '__';
    options.mod = options.mod || '_';

    if (typeof levels === 'string') { levels = [ levels ]; }

    if (!levels) { levels = [ process.cwd() ]; }

    var streams = levels.map(function (level) {
        return stream(level, options);
    });

    return read(streams, { objectMode: true });
}

module.exports = objects;
