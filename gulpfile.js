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
gutil = require('gulp-util');

// Commands
/* Sass */
var sassCmd = 'sass';
var sassSyncCmd = 'sassync';
/* Browser Sync */
var browserSyncCmd = 'bs';

// Sass
var cssDir = './website/CSS';
var scssDir = './sass/**/*.scss';

gulp.task(browserSyncCmd, function() {
    bs.init({
        server: {
            baseDir: './website'
        }
    });
});
 
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

// generic helper functions
/* Generic build script to create diffrent bundles with different inputs */
function buildApp (inputLoc, inputFile, outputLoc, outputFile) {
    //js
var jsBundle = browserify(inputLoc+'/'+inputFile, {
    debug: true
});
return jsBundle
    .transform(stringify, {
    appliesTo: { includeExtensions: ['.html']},
    minify: true
    })
    .bundle()
      .on('error', err => {
            gutil.log("Browserify Error", gutil.colors.red(err.message));
            this.emit("end");
        })
    .pipe(exorcist(outputLoc+'/'+outputFile+'.map'))
    .pipe(source(outputFile))
    .pipe(gulp.dest(outputLoc+'/'));
}