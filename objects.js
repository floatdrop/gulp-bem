var BEMobject = require('bem-object');
var through = require('through2');
var readdir = require('stream-dirs');
var Ordered = require('ordered-read-streams');

function createBemObject() {
    return through.obj(function (obj, enc, cb) {
        BEMobject.create(obj.path, cb);
    });
}

function objects(levels) {
    if (typeof levels === 'string') { levels = [ levels ]; }
    if (!levels) { levels = [process.cwd()]; }
    var streams = levels.map(readdir);
    return new Ordered(streams).pipe(createBemObject());
}

module.exports = objects;
