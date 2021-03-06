var through = require('through2');
var vfs = require('vinyl-fs');
var join = require('path').join;

require('remedial');

function path(dep, options) {
    options = options || {};

    var result = join(dep.level, dep.block);
    if (dep.elem) { result = join(result, (options.elem || '__') + dep.elem); }
    if (dep.modName) { result = join(result, (options.mod || '_') + dep.modName); }
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
                return join(path.call(self, dep, options), str.supplant(dep));
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
