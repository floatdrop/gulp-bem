/* global describe, it */

var bem = require('../index.js');
require('should');

describe('gulp-bem', function () {
    it('should be a function', function () {
        bem.should.be.an.instanceOf(Function);
    });

    it('should throw on invalid arguments', function () {
        (function noArguments() { bem(); }).should.throw(/Invalid levels/);
        (function numberArgument() { bem(1); }).should.throw(/Invalid levels/);
        (function emptyArrayArgument() { bem([]); }).should.throw(/Invalid levels/);
        (function arrayWithNumber() { bem([1]); }).should.throw(/Invalid levels/);
        (function singleStringArgument() { bem('level'); }).should.not.throw(/Invalid levels/);
        (function arrayOfStringsArgument() { bem(['level']); }).should.not.throw(/Invalid levels/);
    });

    it('should result have deps method', function () {
        bem('level').should.have.property('deps').and.instanceOf(Function);
    });
});
