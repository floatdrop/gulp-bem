var through             = require('through2');
var DepsGraph           = require('deps-graph');

function tree () {
    function addToTree (bemObject, enc, callback) {
        try {
            this.graph.add(bemObject);
            callback(null, bemObject);
        } catch (err) {
            callback(err, bemObject);
        }
    }

    var stream = through.obj(addToTree);

    stream.on('finish', function () { stream.finished = true; });

    stream.graph = new DepsGraph();
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
