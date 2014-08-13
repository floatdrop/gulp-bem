var BEMobject = require('bem-object');
var through = require('through2');
var readdir = require('stream-dirs');
var join = require('stream-combiner');

function createBemObject() {
    return through.obj(function (obj, enc, cb) {
        BEMobject.create(obj.path, cb);
    });
}

function blocks (levels) {
    if (typeof levels === 'string') { levels = [ levels ]; }
    if (!levels) { levels = [process.cwd()]; }
    var streams = levels.map(readdir);
    return join(streams).pipe(createBemObject());
}

module.exports = blocks;
