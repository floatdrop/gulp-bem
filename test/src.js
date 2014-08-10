/* global describe, it */

var src = require('../src.js');
var path = require('path');
require('should');

var simpleBundle = path.join(__dirname, 'fixtures/single-bundle/desktop.bundle/index');

describe('bem.src', function () {
    it('should get files from deps', function (done) {
        var stream = src('*.css');
        stream.on('data', function (css) {
            path.basename(css.path).should.eql('index.css');
            done();
        });
        stream.on('error', done);
        stream.write({ path: simpleBundle });
    });

    it('should interpolate dep object properties', function (done) {
        var stream = src('{block}.css');
        stream.on('data', function (css) {
            path.basename(css.path).should.eql('index.css');
            done();
        });
        stream.on('error', done);
        stream.write({
            path: simpleBundle,
            block: 'index'
        });
    });
});
