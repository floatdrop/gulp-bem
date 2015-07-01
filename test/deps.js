/* global describe, it */

var bem     = require('../');
var concat  = require('gulp-concat');

var levels = ['test/fixtures/single.bundle'];
require('should');

describe('bem.deps', function () {
    it('should work with example from readme', function (done) {
        var tree = bem(levels);

        tree.deps('test/fixtures/single.bundle/index')
            .pipe(bem.src('{bem}.css'))
            .pipe(concat('index.css'))
            .on('data', function (css) {
                css.contents.toString().should.eql('1\n\n2\n');
                done();
            });
    });
});
