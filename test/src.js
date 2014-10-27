/* global describe, it */

var src = require('../src.js');
var path = require('path');
require('should');

var singleBundle = 'test/fixtures/single.bundle';

describe('bem.src', function () {
    it('should throw on invalid glob', function () {
        (function () {
            src(undefined);
        }).should.throw(/Invalid glob argument/);
    });

    it('should accept array of globs', function () {
        (function () {
            src(['*.css']);
        }).should.not.throw(/Invalid glob argument/);
    });

    it('should get files from deps', function (done) {
        var stream = src('*.css');
        stream.on('data', function (css) {
            path.basename(css.path).should.eql('index.css');
            done();
        });
        stream.on('error', done);
        stream.write({
            level: singleBundle,
            block: 'index'
        });
    });

    it('should interpolate dep object properties', function (done) {
        var stream = src('{block}.css');
        stream.on('data', function (css) {
            path.basename(css.path).should.eql('index.css');
            done();
        });
        stream.on('error', done);
        stream.write({
            level: singleBundle,
            block: 'index'
        });
    });
});
