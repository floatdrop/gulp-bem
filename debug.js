var through = require('through2');
var chalk = require('chalk');

var colors = [
    //'black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'gray'
];

var hashCode = function (s) {
    return s.split('').reduce(function(a,b){a=((a << 5)-a)+b.charCodeAt(0);return a&a},0);
};

chalk.uniq = function (str) {
    var hash = hashCode(str);
    if (hash < 0) { hash *= -1; }
    var colorIdx = hash % (colors.length - 1);
    return chalk[colors[colorIdx]](str);
};

module.exports = function (options) {
    options = options || {};
    if (typeof options === 'string') { options = { title: options }; }
    var title = options.title ? options.title + ' ' : '';

    return through.obj(function(obj, enc, cb) {
        var message = title ? chalk.uniq(title) + ' ' : '';
        message += '[' + chalk.uniq(obj.level) + '] ' + obj.bem + ' ';
        message += chalk.gray(obj.path);
        console.log(message);
        cb(null, obj);
    });
};
