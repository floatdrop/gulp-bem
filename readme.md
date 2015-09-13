# gulp-bem

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

This package provides simple and clear tools to build your BEM project with simple `deps.js` support.

## Usage

Building CSS for BEM project:

```js
var gulp    = require('gulp');
var bem     = require('gulp-bem');
var concat  = require('gulp-concat');

var levels = ['base', 'blocks'];
var tree = bem(levels);

tree.deps('blocks/page')
    .pipe(bem.src('{bem}.css'))
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./dist'));
```

Pretty easy, eh, mate?

Take a look at [getbem.com](https://getbem.com/) as example of full-featured web site created with BEM and [gulp-bem-stub](https://github.com/matmuchrapna/gulp-bem-stub) as starting template for projects!

## API

### bem(levels, [options])

Creates function, that used for resolving dependencies in BEM project. Returns [`deps` function](https://github.com/floatdrop/deps-graph/tree/1.0#depsbem).

#### levels
Type: `Array` or `String`  
Default: `process.cwd()`

Contains array of [Levels](http://getbem.com/building). They will be used in searching for requested blocks and ordering blocks with same names in different levels.

#### options
Type: `Object`

Options, that passed to [bem-naming](https://github.com/bem/bem-naming).

### bem.src(glob)

This method consumes stream of BEM objects and searches files by glob pattern in them.

All files, that contained under BEM object path, following some convention about naming. Often CSS file have name of block and added `.css` suffix. If BEM object describes block with modificators, then it can be `block_mod_value.css`. You can read about [naming](https://getbem.com/naming.html) and [directory structure](https://getbem.com/building.html) at [getbem.com](https://getbem.com), if there are questions about it.

#### glob
Type: `String` or `Array`  

Same as in [gulp.src](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options) method, but with some interpolation happening. To provide BEM name generation - `bem.src` will substitute (with [supplant](http://javascript.crockford.com/remedial.html) syntax) all properties in BEM object.

## Related

 * [gulp-bem-debug](https://github.com/floatdrop/gulp-bem-debug) - nice output for BEM objects in stream.
 * [gulp-bem-specs](https://github.com/floatdrop/gulp-bem-specs) - specifications, that used in `gulp-bem`.
 * [gulp-bem-pack](https://github.com/floatdrop/gulp-bem-pack) - packing JavaScript CommonJS files with browserify.

## Questions

[![Gitter chat](https://badges.gitter.im/bem/talk.png)](https://gitter.im/bem/talk)

## License

MIT (c) 2014 Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/gulp-bem
[npm-image]: http://img.shields.io/npm/v/gulp-bem.svg?style=flat

[travis-url]: http://travis-ci.org/floatdrop/gulp-bem
[travis-image]: http://img.shields.io/travis/floatdrop/gulp-bem.svg?branch=master&style=flat

[depstat-url]: https://david-dm.org/floatdrop/gulp-bem
[depstat-image]: http://img.shields.io/david/floatdrop/gulp-bem.svg?style=flat

[coveralls-url]: https://coveralls.io/r/floatdrop/gulp-bem
[coveralls-image]: http://img.shields.io/coveralls/floatdrop/gulp-bem.svg?style=flat
