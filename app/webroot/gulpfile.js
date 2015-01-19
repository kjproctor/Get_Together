'strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var reactify = require('reactify');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

gulp.task('browserify', function() {
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.add('./js/app.js');
  return b.bundle()
    .pipe(source('app.js'))
	.pipe(plumber())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('minify:app', function () {
    gulp.src('./css/*.css')
        .pipe(minify({keepBreaks: true}))
        .pipe(rename({
            suffix: '.min'
        }))
	   .pipe(gulp.dest('./build/css/'));
});

gulp.task('clean:js', function () {
    return gulp.src('build/js/**', {read: false})
        .pipe(clean({force:true}));
});

gulp.task('clean:css', function () {
    return gulp.src(['build/css/*.*', 'build/css/boostrap/*.*', 'build/css/bootstrap/fonts/*.*'], {read: false})
        .pipe(clean({force:true}));
});

gulp.task('copy:bootstrap', function() {
   gulp.src(['./node_modules/bootstrap/dist/css/*.min.css'])
   .pipe(gulp.dest('./build/css/bootstrap'));
});

gulp.task('copy:bootstrap:fonts', function() {
   gulp.src(['./node_modules/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}'])
   .pipe(gulp.dest('./build/css/fonts'));
});

gulp.task('copy', ['copy:bootstrap', 'copy:bootstrap:fonts']);
gulp.task('minify', ['minify:app']);
gulp.task('clean', ['clean:js', 'clean:css']);
gulp.task('build', ['clean', 'minify', 'browserify', 'copy']);
gulp.task('default', ['build']);
