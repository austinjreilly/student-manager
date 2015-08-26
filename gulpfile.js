// Dependencies

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename =  require('gulp-rename');
var watch = require('gulp-watch');

// Configuration
var sassSource = './app/assets/scss/**/*.scss';
var sassDestination = './app/assets/css';
var jsSource = './app';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// Sass
gulp.task('sass', function () {
  return gulp
    .src(sassSource)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(sassDestination))
});

// Watch
gulp.task('default',function() {
    gulp.watch(sassSource,['sass']);
});