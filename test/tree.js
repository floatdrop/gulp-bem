/* global describe, it */

var blocks      = require('../blocks.js');
var bemTree     = require('../tree.js');
var path        = require('path');
var sinon       = require('sinon');

var depsBundle  = path.join(__dirname, 'fixtures/deps.bundle');

describe('bem.tree', function () {
    it('should return object with deps function', function () {
        bemTree().should.have.property('deps').with.instanceOf(Function);
    });

    it('should be passThrough stream', function (done) {
        blocks(depsBundle)
            .pipe(bemTree())
            .on('data', done.bind(null, null));
    });

    it('should emit deps only when tree is ready', function (done) {
        var tree = bemTree();
        tree.deps('path')
            .on('data', done.bind(null, new Error('Deps emit data before finish event!')));
        setTimeout(done, 10);
    });

    it('should call add on graph', function (done) {
        var tree = bemTree();
        sinon.stub(tree.graph, 'add', function (dep) {
            dep.should.have.property('block', 'index');
            done();
        });
        blocks(depsBundle)
            .pipe(tree);
    });

    it('should emit returned array from BEMGraph as stream', function (done) {
        var tree = bemTree();
        sinon.stub(tree.graph, 'dependencies', function () {
            return [1];
        });

        blocks(depsBundle)
            .pipe(tree);

        tree.deps()
            .on('data', function (i) {
                i.should.eql(1);
                done();
            });
    });
});
