'use strict';

// Gulp objects
var gulp = require('gulp'),
    bs = require('browser-sync').create(), // create a browser sync instance.
    sass = require('gulp-sass'),
    // Browserify dependencies
    browserify = require('browserify'),
    exorcist = require('exorcist'),
    stringify = require('stringify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    // Test dependencies
    jasmine = require('gulp-jasmine'),
    karmaServer = require('karma').Server,
    jasmineBrowser = require('gulp-jasmine-browser');


// Commands
/* Sass */
var sassCmd = 'sass';
var sassSyncCmd = 'sassync';
/* Browser Sync */
var browserSyncCmd = 'bs';
// Sass
var cssDir = './website/CSS';
var scssDir = './sass/**/*.scss';

/* Browser Sync */
gulp.task(browserSyncCmd, function () {
    bs.init({
        server: {
            baseDir: './website'
        }
    });
});

/* Sass */
gulp.task(sassCmd, function () {
    return gulp.src(scssDir)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDir));
});
gulp.task(sassSyncCmd, function () {
    return gulp.src(scssDir)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(cssDir));
});
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

/* Test webapp */
gulp.task('test-app', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

/* Browserify Build Tasks*/
gulp.task('build-app', function () {
    buildApp('src/', 'index.js', 'website/JavaScript/app', 'bundle.js');
});
gulp.task('watch-app', function () {
    gulp.watch(['src/**/*.js', '!app/bundle.js'], ['build-app']);
});

// generic helper functions
/* Generic build script to create diffrent bundles with different inputs */
function buildApp(inputLoc, inputFile, outputLoc, outputFile) {
    //js
    var jsBundle = browserify(inputLoc + '/' + inputFile, {
        debug: true
    });
    return jsBundle
        .transform(stringify, {
            appliesTo: { includeExtensions: ['.html'] },
            minify: true
        })
        .bundle()
        .on('error', err => {
            gutil.log("Browserify Error", gutil.colors.red(err.message));
            this.emit("end");
        })
        .pipe(exorcist(outputLoc + '/' + outputFile + '.map'))
        .pipe(source(outputFile))
        .pipe(gulp.dest(outputLoc + '/'));
}