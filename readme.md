# gulp-bem [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]
> Toolset for building bem project with gulp

## Usage

See [gulp-bem-stub](https://github.com/matmuchrapna/gulp-bem-stub) as example of full-featured web site created with BEM.

## API

### bem.blocks([levels])

Emits all blocks under. It will add all blocks from levels directories (or current directory).

You can read about block definition [here](https://github.com/floatdrop/gulp-bem#block-definition).

###### levels
Type: `String` or `Array`
Default: `process.cwd()`

Optional level or list of levels to load blocks from. If omitted - current directory is used as default level.

### bem.tree()

Constructs dependency tree of your BEM project by consuming stream of blocks definitions. All further work is happens on this tree.

```js
var gulp = require('gulp');
var bem = require('gulp-bem');
var tree = bem.blocks().pipe(bem.tree())
```

It will return  __non-mutable__ passThrough Stream with additional method. On each new pipe call tree will be set as parent to empty tree.

### tree.deps(path)

After you got your tree - you can call this method to get __ordered__ blocks definitions, that should be used to build CSS/JS/etc of BEM project. Order is determinated by `shouldDeps` and `mustDeps` in `*.deps.js` files. You can read about [`*.deps.js` syntax](http://bem.info/tools/bem/bem-tools/depsjs/) on BEM site.

```js
// suppose you have desktop.bundles/index as entry point of index page
var deps = tree.deps('desktop.bundles/index');
```

This will return Stream of block definitions. You can manually fetch needed files from them, but we provide additional helper methods to do this.

### bem.src(glob)

This method consumes stream of block definitions and searches files by glob pattern in them. Pattern is the same as in [gulp.src](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options) method, but with some interpolation happening.

All files in blocks, that are described by block definition, following some convention about naming. Often CSS file have name of block and added `.css` suffix. If definition describes block with modificators, then it can be `block_mod_value.css`. You can read about [bem-naming](http://bem.info/tools/bem/bem-naming/) and [directory structure](http://bem.info/method/filesystem/) at [BEM site](http://bem.info), if there are questions about it.

To provide this name generation `bem.src` will substitute (with [supplant](http://javascript.crockford.com/remedial.html) syntax) all properties in block definition.

In conclusion, if you need to get all css files, then write:

```js
var concat = require('gulp-concat');
deps.src('{bem}.css').pipe(concat('index.css'));
```

Whole code to build CSS file will look like this:

```js
var gulp = require('gulp');
var bem = require('gulp-bem');
var concat = require('gulp-concat');
var tree = bem.blocks().pipe(bem.tree())

var deps = tree.deps('desktop.bundles/index');
deps.src('{bem}.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./dist'));
```

Pretty easy, eh, mate? More detailed example can be found in [gulp-bem-stub](https://github.com/matmuchrapna/gulp-bem-stub). Take a look!

## Block definition

Block definition object is just an abstraction. Each block definition object encapsulate next properties:

 * `path` - full path to directory, that contains block files
 * `level` - level of definition of current block
 * `block` - name of the block
 * `elem` - name of the element
 * `mod` - name of the modificator
 * `value` - value of the modificator
 * `bem` - valid BEM identifier, composed from `block`, `elem`, `mod` and `value`

Besides this properties object can contain helper methods, but for know it does not.

## License

MIT (c) 2014 Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/gulp-bem
[npm-image]: https://badge.fury.io/js/gulp-bem.png

[travis-url]: http://travis-ci.org/floatdrop/gulp-bem
[travis-image]: https://travis-ci.org/floatdrop/gulp-bem.png?branch=master

[depstat-url]: https://david-dm.org/floatdrop/gulp-bem
[depstat-image]: https://david-dm.org/floatdrop/gulp-bem.png?theme=shields.io
