/* global describe, it */

var bem = require('../index.js');
require('should');

describe('gulp-bem', function () {
    it('should contain declared methods', function () {
        bem.should.have.property('objects');
        bem.should.have.property('src');
        bem.should.have.property('tree');
    });
});
