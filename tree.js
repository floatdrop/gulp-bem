var through     = require('through2');
var src         = require('./src.js');
var DepsGraph   = require('deps-graph');
var streamArray = require('stream-array');
var after       = require('after-event');

function tree(parent) {
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

    var graph = stream.graph = new DepsGraph(parent && parent.graph);
    stream.clone = function () {
        return tree(stream);
    };

    stream.deps = function (path) {
        var output = through.obj();

        var i = 1;
        function tick() {
            i --;
            if (i === 0) {
                streamArray(graph.deps(path)).pipe(output);
            }
        }

        if (parent) {
            i ++;
            after(parent, 'finish', tick);
        }

        after(stream, 'finish', tick);

        output.src = function () {
            return output.pipe(src.apply(self, arguments));
        };

        return output;
    };

    return stream;
}

module.exports = tree;
