var through = require('through2');
var vfs = require('vinyl-fs');
var join = require('path').join;

require('remedial');

function path(dep) {
    var result = join(dep.level, dep.block);
    if (dep.elem) { result = join(result, this.elemDelim + dep.elem); }
    if (dep.mod) { result = join(result, this.modDelim + dep.mod); }
    return result;
}

function src(glob, options) {
    var self = this;

    if (!isValidGlob(glob)) {
        throw new Error('Invalid glob argument: ' + glob);
    }

    if (typeof glob === 'string') { glob = [ glob ]; }

    function findFile(dep, enc, cb) {
        var newGlobs = glob
            .map(function (str) {
                return join(path.call(self, dep), str.supplant(dep));
            });

        vfs.src(newGlobs, options)
            .on('data', this.push.bind(this))
            .on('error', cb)
            .on('end', cb);
    }

    return through.obj(findFile);
}

function isValidGlob(glob) {
    if (typeof glob === 'string') {
        return true;
    }
    if (Array.isArray(glob) && glob.length !== 0) {
        return true;
    }
    return false;
}

module.exports = src;
