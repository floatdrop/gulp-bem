/* global describe, it */

var objects = require('../objects.js');
var path = require('path');
var assert = require('stream-assert');

var simpleBundle = path.join(__dirname, 'fixtures/single.bundle');
var coupleBundle = path.join(__dirname, 'fixtures/couple.bundle');

describe('bem.objects', function () {
    it('should get single object from level', function (done) {
        objects(simpleBundle)
            .pipe(assert.length(1))
            .on('end', done);
    });

    it('should get objects from level', function (done) {
        objects(coupleBundle)
            .pipe(assert.length(2))
            .on('end', done);
    });

    it('should accept array of levels', function (done) {
        objects([simpleBundle, coupleBundle])
            .pipe(assert.length(3))
            .on('end', done);
    });
});
