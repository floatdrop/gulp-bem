var through = require('through2');
var fs = require('fs');
var join = require('path').join;
var rod = require('require-or-die');
var normalize = require('deps-normalize');

function deps() {
    function readDeps(bem, enc, cb) {
        var depsFile = join(bem.path, bem.id + '.deps.js');
        fs.exists(depsFile, function (exist) {
            if (!exist) { return cb(null, bem); }
            rod(depsFile, function (err, deps) {
                if (err) { return cb(err); }
                bem.require = normalize(deps.require || deps.mustDeps || []);
                bem.expect = normalize(deps.expect || deps.shouldDeps || []);
                cb(null, bem);
            });
        });
    }

    return through.obj(readDeps);
}

module.exports = deps;
