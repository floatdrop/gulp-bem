/* global describe, it */

var deps        = require('../deps.js');
var objects     = require('../objects.js');
var path        = require('path');
require('should');

var depsBundle  = path.join(__dirname, 'fixtures/deps.bundle');
var singleBundle  = path.join(__dirname, 'fixtures/single.bundle');

describe('gulp-bem.deps', function () {
    it('should read deps file for bemObject', function (done) {
        objects(depsBundle).pipe(deps()).on('data', function (obj) {
            obj.should.have.property('require', []);
            done();
        });
    });

    it('should pass through file without deps', function (done) {
        objects(singleBundle).pipe(deps()).on('data', function (obj) {
            obj.should.not.have.property('require');
            done();
        });
    });
});
