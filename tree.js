var through             = require('through2');
var DeclGraph           = require('decl-graph');
var runInThisContext    = require('vm').runInThisContext;
var assign              = require('object-assign');
var pathToBemProperties = require('./path-to-bem-properties.js');

function tree () {
    function addToTree (file, enc, callback) {
        try {
            var decl = runInThisContext(file.contents, { filename: file.path });
            assign(decl, pathToBemProperties(file.path));
            this.graph.addDecl(decl);
            callback(null, file);
        } catch (err) {
            callback(err, file);
        }
    }

    var stream = through.obj(addToTree);

    stream.on('finish', function () { stream.finished = true; });

    stream.graph = new DeclGraph();
    stream.deps = function (path) {
        var output = through.obj();

        function writeDeps() {
            stream.graph.dependencies(path).forEach(function (dep) {
                output.write(dep);
            });
            output.end();
        }

        if (stream.finished) {
            writeDeps();
        } else {
            stream.on('finish', writeDeps);
        }

        return output;

    };
    return stream;
}

module.exports = tree;
