'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var streamify = require('gulp-streamify');
var config = require('./config');
var isProd = (config.env === 'prod');
var i18n = require('i18n');
var locales = ['en', 'fr'];
var Campsi = require('campsi-core');
var fs = require('fs');
var through = require('through2');
var path = require('path');

i18n.configure({
    locales: locales,
    directory: '../locales'
});

require('../index');

var coreDependencies = [
    'campsi-core',
    'async',
    'cheerio-or-jquery',
    'is-browser',
    'deepcopy',
    'equals',
    'extend',
    //'page',
    'handlebars'
];

var serverOnlyDependencies = [
    'util',
    'cheerio',
    'console.table',
    'request',
    'jade',
    'path',
    'i18n',
    'fs',
    'node-redis-pubsub',
    'mongoose',
    'unicode/category/So',
    'najax',
    '@risingstack/trace'
];


gulp.task('core', function () {

    var b = browserify({
        debug: true
    });

    coreDependencies.forEach(function (dep) {
        b.require(dep);
    });

    serverOnlyDependencies.forEach(function (dep) {
        b.exclude(dep);
    });

    var bundle = b.bundle().pipe(source('campsi.core.js'));
    if (isProd) {
        bundle.pipe(streamify(uglify()));
    }

    return bundle.pipe(gulp.dest('./dist'));
});

var packComponents = function (map, dest) {

    // set up the browserify instance on a task basis
    var b = browserify(map, {
        bundleExternals: false
    });

    coreDependencies.forEach(function (dep) {
        b.exclude(dep);
    });

    serverOnlyDependencies.forEach(function (dep) {
        b.ignore(dep);
    });

    var bundle = b.bundle().pipe(source(dest));
    if (isProd) {
        bundle.pipe(streamify(uglify()));
    }

    return bundle.pipe(gulp.dest('./dist'));

};


gulp.task('standard-components', function () {
    return packComponents('../index.js', 'campsi.components.js');
});


gulp.task('stylus', function () {
    gulp.src('./style.styl')
        .pipe(stylus({
            compress: false,
            'include css': true
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('html', function () {
    var transform = function (file, enc, cb) {

        var Context = function(){

        };
        Context.prototype.translate = function(){
            return '*translation'
        };

        var options = {
            context: new Context(),
            options: JSON.parse(file.contents.toString('utf8'))
        };

        Campsi.create('form', options, function (comp) {
            var html = comp.render();
            var template = fs.readFileSync('./template.html', 'utf8');
            file.contents = new Buffer(template.replace('$$FORM$$', html));
            file.path = './form.html';
            cb(null, file);
        });
    };

    var createComponents = function () {
        return through.obj(transform)
    };

    return gulp.src('./formOptions.json')
        .pipe(createComponents())
        .pipe(gulp.dest('./dist'));
});


gulp.task('all', ['html', 'core', 'standard-components', 'stylus']);

gulp.task('watch', function(){
    gulp.watch('../lib/**/*.js', ['standard-components', 'html']);
    gulp.watch('../**/*.styl', ['stylus']);
    gulp.watch('./formOptions.json', ['html']);
});

gulp.task('default', ['all', 'watch']);