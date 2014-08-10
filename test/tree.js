/* global describe, it */

var src         = require('vinyl-fs').src;
var bemTree     = require('../tree.js');
var path        = require('path');
var should      = require('should');
var sinon       = require('sinon');

var depsBundle  = path.join(__dirname, 'fixtures/deps.bundle/**/*.deps.js');
var throwBundle = path.join(__dirname, 'fixtures/throw.bundle/**/*.deps.js');

describe('bem.tree', function () {
    it('should return object with deps function', function () {
        bemTree().should.have.property('deps').with.instanceOf(Function);
    });

    it('should be passThrough stream', function (done) {
        src(depsBundle)
            .pipe(bemTree())
            .on('data', done.bind(null, null));
    });

    it('should parse deps files', function (done) {
        src(throwBundle)
            .pipe(bemTree())
            .on('error', function (err) {
                should.exist(err);
                err.message.should.eql('Bang!');
                done();
            })
            .on('finish', done.bind(null, new Error('Did not emit error event')));
    });

    it('should emit deps only when tree is ready', function (done) {
        var tree = bemTree();
        tree.deps('path')
            .on('data', done.bind(null, new Error('Deps emit data before finish event!')));
        setTimeout(done, 10);
    });

    it('should call addDep on graph', function (done) {
        var tree = bemTree();
        sinon.stub(tree.graph, 'addDep', function (dep) {
            dep.should.have.property('block', 'index');
            done();
        });
        src(depsBundle)
            .pipe(tree);
    });

    it('should emit returned array from BEMGraph as stream', function (done) {
        var tree = bemTree();
        sinon.stub(tree.graph, 'dependencies', function () {
            return [1];
        });

        src(depsBundle)
            .pipe(tree);

        tree.deps()
            .on('data', function (i) {
                i.should.eql(1);
                done();
            });
    });
});
