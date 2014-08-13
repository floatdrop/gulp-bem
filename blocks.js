var BEMobject = require('bem-object');
var through = require('through2');
var readdir = require('stream-dirs');
var join = require('stream-combiner');

function createBemObject() {
    return through.obj(function (obj, enc, cb) {
        BEMobject.create(obj.path, cb);
    });
}

function readdirs(level) {
    return readdir(level).pipe(through.obj(function (obj, enc, cb) {
        if (obj.stat.isDirectory()) {
            this.push(obj);
        }
        cb();
    }));
}

function blocks (levels) {
    if (typeof levels === 'string') { levels = [ levels ]; }
    if (!levels) { levels = [process.cwd()]; }
    var streams = levels.map(readdirs);
    return join(streams).pipe(createBemObject());
}

module.exports = blocks;
