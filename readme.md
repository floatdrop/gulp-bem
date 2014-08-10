# gulp-bem [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]
> Toolset for building bem project with gulp

## Usage

See [gulp-bem-stub](https://github.com/matmuchrapna/gulp-bem-stub) as example of full-featured web site created with BEM.

## API

### bem.tree([levels])

This method constructs dependency tree of your BEM project by consuming stream of `*.decl.js` files. All further work is happens on this tree.

```js
var gulp = require('gulp');
var bem = require('gulp-bem');
var tree = gulp.src('**/*.deps.js').pipe(bem.tree())
```

It will return passThrough Stream with additional method.

__Note:__ You can pass array of levels to tree, but we still don't sure this is necessary (to be clarified later).

### tree.deps(path)

After you got your tree - you can call this method to get __ordered__ deps objects, that should be used to build CSS/JS/etc of BEM project. Order is determinated by `shouldDeps` and `mustDeps` in `*.decl.js` files. You can read about [`*.deps.js` syntax](http://bem.info/tools/bem/bem-tools/depsjs/) on BEM site.

```js
// suppose you have desktop.bundles/index as entry point of index page
var deps = tree.deps('desktop.bundles/index');
```

This will return Stream of deps objects. You can manually fetch needed files from them, but we provide additional helper methods to do this. 

### bem.src(glob)

This method consumes stream of deps objects and searches files by glob pattern in them. Pattern is the same as in [gulp.src](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options) method, but with some interpolation happening.

All files in blocks, that are described by deps objects, following some convention about naming. Often CSS file have name of block and added `.css` suffix. If deps object describes block with modificators, then it can be `block_mod_value.css`. You can read about [bem-naming](http://bem.info/tools/bem/bem-naming/) and [directory structure](http://bem.info/method/filesystem/) at [BEM site](http://bem.info), if there are questions about it.

To provide this name generation `bem.src` will substitute (with [supplant](http://javascript.crockford.com/remedial.html) syntax) [special variables](https://github.com/floatdrop/gulp-bem#bemsrc-variables).

In conclusion, if you need to get all css files in deps objects, then write:

```js
var concat = require('gulp-concat');
deps.src('{bem}.css').pipe(concat('index.css'));
```

Whole code to build CSS file will look like this:

```js
var gulp = require('gulp');
var bem = require('gulp-bem');
var concat = require('gulp-concat');
var tree = gulp.src('**/*.deps.js').pipe(bem.tree())

var deps = tree.deps('desktop.bundles/index');
deps.src('{bem}.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./dist'));
```

Pretty easy, eh, mate? More detailed example can be found in [gulp-bem-stub](https://github.com/matmuchrapna/gulp-bem-stub). Take a look!

## bem.src variables

There are bunch of simple variables to substitute parts of deps object properties:

 * `block` - block name
 * `bmod` - block modificator name
 * `bvalue` - block modificator value
 * `elem` - element name
 * `emod` - element modificator
 * `evalue` - element modificator value

And there is `bem` variable for substitution valid BEM identifier. It composed by following rules:

 1. First always goes `block` name
 2. If there are no `elem` then join modifier and modifier value 
 3. Else join `elem` and join element modifier and element modifier value

## License

MIT (c) 2014 Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/gulp-bem
[npm-image]: https://badge.fury.io/js/gulp-bem.png

[travis-url]: http://travis-ci.org/floatdrop/gulp-bem
[travis-image]: https://travis-ci.org/floatdrop/gulp-bem.png?branch=master

[depstat-url]: https://david-dm.org/floatdrop/gulp-bem
[depstat-image]: https://david-dm.org/floatdrop/gulp-bem.png?theme=shields.io
