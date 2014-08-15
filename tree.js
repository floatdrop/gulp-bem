var through     = require('through2');
var DepsGraph   = require('deps-graph');
var streamArray = require('stream-array');
var after       = require('after-event');

function tree() {
    var stream = through.obj(addToTree);

    function addToTree(bemObject, enc, callback) {
        try {
            this.graph.add(bemObject);
            callback(null, bemObject);
        } catch (err) {
            callback(err, bemObject);
        }
    }

    var graph = stream.graph = new DepsGraph();
    stream.deps = function (path) {
        var output = through.obj();
        after(stream, 'finish', function () {
            streamArray(graph.deps(path)).pipe(output);
        });
        return output;
    };

    return stream;
}

module.exports = tree;
