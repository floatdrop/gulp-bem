var stream = require('bem-object').stream;
var read = require('multistream');
var asyncDone = require('async-done');
var map = require('map-stream');

function objects(levels) {
    if (typeof levels === 'string') { levels = [ levels ]; }

    if (!levels) { levels = [ process.cwd() ]; }

    var streams = levels.map(function (level) {
        return stream(level, this._options);
    });

    var outputStream = read(streams, { objectMode: true });

    outputStream.map = function (mapper) {
        var mapStream = map(function (data, cb) {
            asyncDone(mapper.bind(null, data), function (error) {
                if (error) { return cb(error); }
                cb();
            });
        });

        return outputStream.pipe(mapStream);
    };

    return outputStream;
}

module.exports = objects;
