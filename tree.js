var through     = require('through2');
var src         = require('./src.js');
var DepsGraph   = require('deps-graph');
var streamArray = require('stream-array');
var after       = require('after-event');

function tree(parent) {
    var self = this;
    var stream = through.obj(addToTree);
    parent = parent || {};

    function addToTree(bemObject, enc, callback) {
        try {
            this.graph.add(bemObject);
            callback(null);
        } catch (err) {
            callback(err);
        }
    }

    var graph = stream.graph = new DepsGraph(parent.graph);
    stream.clone = function () {
        return tree(self);
    };

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
