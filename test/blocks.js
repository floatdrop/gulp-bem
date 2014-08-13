/* global describe, it */

var blocks = require('../blocks.js');
var path = require('path');
var assert = require('stream-assert');

var simpleBundle = path.join(__dirname, 'fixtures/single.bundle');
var coupleBundle = path.join(__dirname, 'fixtures/couple.bundle');

describe('bem.blocks', function () {
    it('should get block from level', function (done) {
        blocks(simpleBundle)
            .pipe(assert.length(1))
            .on('end', done);
    });

    it('should get blocks from level', function (done) {
        blocks(coupleBundle)
            .pipe(assert.length(2))
            .on('end', done);
    });
});
