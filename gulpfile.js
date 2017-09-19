var gulp = require('gulp');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  source: './src/*.scss',
  doc: './docs/src/*.scss'
};

gulp.task('watch', function() {
  gulp.watch('./**/*.scss', ['build']);
  gulp.watch('./**/*.scss', ['docs']);
});

gulp.task('build', function() {
  gulp.src(paths.source)
    .pipe(sass({outputStyle: 'compact', precision: 10}))
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('../quarry-webapp/dist/css'))
    .pipe(gulp.dest('../quarry-extension/css'));
  gulp.src('./src/_variables.scss')
    .pipe(gulp.dest('../quarry-webapp/src/css'));
});

gulp.task('default', ['build']);
