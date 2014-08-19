var through     = require('through2');
var src         = require('./src.js');
var DepsGraph   = require('deps-graph');
var streamArray = require('stream-array');
var after       = require('after-event');

function tree() {
    var self = this;
    var stream = through.obj(addToTree);

    function addToTree(bemObject, enc, callback) {
        try {
            this.graph.add(bemObject);
            callback(null);
        } catch (err) {
            callback(err);
        }
    }

    var graph = stream.graph = new DepsGraph();
    stream.deps = function (path) {
        var output = through.obj();
        after(stream, 'finish', function () {
            streamArray(graph.deps(path)).pipe(output);
        });

        output.src = function () {
            return output.pipe(src.apply(self, arguments));
        };

        return output;
    };

    return stream;
}

module.exports = tree;
