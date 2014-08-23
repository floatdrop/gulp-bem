var through = require('through2');
var fs = require('fs');
var join = require('path').join;
var rod = require('require-or-die');
var depsnormalize = require('deps-normalize');

function normalize(p, c) { return p.concat(depsnormalize(c)); }

function toArray(obj) {
    if (!obj) { return []; }
    if (!Array.isArray(obj)) { return [obj]; }
    return obj;
}

function deps() {
    function readDeps(bem, enc, cb) {
        var depsFile = join(bem.path, bem.id + '.deps.js');
        fs.exists(depsFile, function (exist) {
            if (!exist) { return cb(null, bem); }
            rod(depsFile, function (err, deps) {
                if (err) { return cb(err); }
                bem.require = toArray(deps.require || deps.mustDeps)
                    .reduce(normalize, [])
                    .map(bem.copy, bem);

                bem.expect = toArray(deps.expect || deps.shouldDeps)
                    .reduce(normalize, [])
                    .map(bem.copy, bem);

                cb(null, bem);
            });
        });
    }

    return through.obj(readDeps);
}

module.exports = deps;
