# gulp-bem

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

This package provides simple and clear tools to build your BEM project.

## Disclaimer

We do not support [bem-core](https://github.com/bem/bem-core) and [bem-components](https://github.com/bem/bem-components), because of complex dependency system used in this layers. But we working on simplified layers - [bem-base](https://github.com/matmuchrapna/bem-base) and [bem-bootstrap](https://github.com/matmuchrapna/bem-bootstrap), which will be used in [gulp-bem-stub](https://github.com/matmuchrapna/gulp-bem-stub).

## Usage

Building CSS for BEM project:

```js
var gulp    = require('gulp');
var bem     = require('gulp-bem');
var concat  = require('gulp-concat');

var levels = ['base', 'blocks']
var deps = bem.objects(levels);

deps.src('{bem}.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./dist'));
```

Pretty easy, eh, mate?

Take a look at [gulp-bem-stub](https://github.com/matmuchrapna/gulp-bem-stub) as example of full-featured web site created with BEM.

## API

### bem.BEM([options])

Constructor, that can be used to configure new `gulp-bem` instance. By default `require` will return instance with default options.

#### options
Type: `Object`

##### options.elem
Type: `String`  
Default: `__`

Element delimeter.

##### options.mod
Type: `String`  
Default: `_`

Modificator and value delimeter.

### bem.objects([levels])

It will parse and emit all [BEM objects](https://github.com/floatdrop/bem-object) from levels directories.

###### levels
Type: `String` or `Array`  
Default: `process.cwd()`  

Optional level or list of levels to load BEM objects from. If omitted - current directory is used as default level.

### bem.deps()

Reads `require` and `expect` properties from `*.deps.js` files (also normalized by [deps-normalize](https://github.com/floatdrop/deps-normalize#normalization) package). You can read more about parsing `*.deps.js` files in [source code](https://github.com/floatdrop/gulp-bem/blob/master/deps.js).

### bem.tree([parent])

Constructs dependency tree of your BEM project by consuming stream of BEM objects. All further work is happens on this tree.

```js
var bem = require('gulp-bem');

var tree = bem.objects().pipe(bem.deps()).pipe(bem.tree());
```

It will return Stream with additional method. On each new pipe call tree will be set as parent to empty tree.

###### parent
Type: `Object`

Parent tree, that be used in deps searches (read [clone](https://github.com/floatdrop/gulp-bem#treeclone) method description).

### tree.deps(path)

After you got your tree - you can call this method to get __ordered__ BEM objects, that should be used to build CSS/JS/etc of BEM project. Order is determinated by `require` and `expect` properties in BEM object.

```js
// suppose you have desktop.bundles/index as entry point of index page
var deps = tree.deps('desktop.bundles/index');
```

This will return Stream of BEM objects. You can manually fetch needed files from them, but we provide additional helper methods to do this.

###### path
Type: `String`  

This parameters points to a BEM object in tree, which dependency stream you want to get. Essentialy it's a path to a BEM object in filesystem (one-to-one).

### tree.clone()

Returns cloned tree, that should be used for creating separate groups of levels. For example common blocks can be shared through base tree with blocks on page.

Internal it is just shortcut to `bem.tree(tree)`.

### bem.src(glob)

This method consumes stream of BEM objects and searches files by glob pattern in them.

All files, that contained under BEM object path, following some convention about naming. Often CSS file have name of block and added `.css` suffix. If BEM object describes block with modificators, then it can be `block_mod_value.css`. You can read about [bem-naming](http://bem.info/tools/bem/bem-naming/) and [directory structure](http://bem.info/method/filesystem/) at [BEM site](http://bem.info), if there are questions about it.

If you need to get all css files, then write:

```js
var concat = require('gulp-concat');

deps.src('{bem}.css').pipe(concat('index.css'));
```

###### glob
Type: `String` or `Array`  

Same as in [gulp.src](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options) method, but with some interpolation happening. To provide BEM name generation - `bem.src` will substitute (with [supplant](http://javascript.crockford.com/remedial.html) syntax) all properties in BEM object.

## Related

 * [gulp-bem-debug](https://github.com/floatdrop/gulp-bem-debug) - nice output for BEM objects in stream.
 * [gulp-bem-specs](https://github.com/floatdrop/gulp-bem-specs) - specifications, that used in `gulp-bem`.

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
