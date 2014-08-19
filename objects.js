var stream = require('bem-object').stream;
var read = require('multistream');

function objects(levels) {
    if (typeof levels === 'string') { levels = [ levels ]; }

    if (!levels) { levels = [process.cwd()]; }

    var streams = levels.map(stream);

    return read(streams, { objectMode: true });
}

module.exports = objects;
