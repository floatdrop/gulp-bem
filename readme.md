# gulp-bem [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]
> Toolset for building bem project with gulp

## Usage

See [gulp-bem-stub](https://github.com/matmuchrapna/gulp-bem-stub) as example of full-featured web site created with BEM.

## API

### bem.objects([levels])

It will emit all [BEM objects](https://github.com/floatdrop/bem-object) from levels directories.

###### levels
Type: `String` or `Array`
Default: `process.cwd()`

Optional level or list of levels to load BEM objects from. If omitted - current directory is used as default level.

### bem.tree()

Constructs dependency tree of your BEM project by consuming stream of BEM objects. All further work is happens on this tree.

```js
var gulp = require('gulp');
var bem = require('gulp-bem');
var tree = bem.objects().pipe(bem.tree());
```

It will return  __immutable__ passThrough Stream with additional method. On each new pipe call tree will be set as parent to empty tree.

### tree.deps(path)

After you got your tree - you can call this method to get __ordered__ BEM objects, that should be used to build CSS/JS/etc of BEM project. Order is determinated by `require` and `expect` properties in BEM object.

```js
// suppose you have desktop.bundles/index as entry point of index page
var deps = tree.deps('desktop.bundles/index');
```

This will return Stream of BEM objects. You can manually fetch needed files from them, but we provide additional helper methods to do this.

### bem.src(glob)

This method consumes stream of BEM objects and searches files by glob pattern in them. Pattern is the same as in [gulp.src](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options) method, but with some interpolation happening.

All files, that contained under BEM object path, following some convention about naming. Often CSS file have name of block and added `.css` suffix. If BEM object describes block with modificators, then it can be `block_mod_value.css`. You can read about [bem-naming](http://bem.info/tools/bem/bem-naming/) and [directory structure](http://bem.info/method/filesystem/) at [BEM site](http://bem.info), if there are questions about it.

To provide this name generation `bem.src` will substitute (with [supplant](http://javascript.crockford.com/remedial.html) syntax) all properties in BEM object.

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
var tree = bem.objects().pipe(bem.tree());

var deps = tree.deps('desktop.bundles/index');
deps.src('{bem}.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./dist'));
```

Pretty easy, eh, mate? More detailed example can be found in [gulp-bem-stub](https://github.com/matmuchrapna/gulp-bem-stub). Take a look!

## License

MIT (c) 2014 Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/gulp-bem
[npm-image]: https://badge.fury.io/js/gulp-bem.png

[travis-url]: http://travis-ci.org/floatdrop/gulp-bem
[travis-image]: https://travis-ci.org/floatdrop/gulp-bem.png?branch=master

[depstat-url]: https://david-dm.org/floatdrop/gulp-bem
[depstat-image]: https://david-dm.org/floatdrop/gulp-bem.png?theme=shields.io
