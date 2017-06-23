/**
 * Created by: Jiravat
 * Date: 6/23/2017
 * Project: PWA-hackathon
 */
var gulp = require('gulp');
var minifyCSS = require('gulp-csso'); //Minify CSS plugin
var concatCss = require('gulp-concat-css'); // Concat CSS plugin
var concat = require('gulp-concat'); //concat js
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');


gulp.task('css', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("bundle.css"))
        .pipe(minifyCSS("bundle.css"))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('js', function() {
    return gulp.src(
        [
            'src/js/jquery.min.js',
            'src/js/moment.min.js',
            'src/js/*.js'
        ]
    )

        .pipe(concat('bundle.min.js'))
        .pipe(uglify('bundle.min.js'))
        .pipe(gulp.dest('build/js/'));
});


gulp.task('min-html', function() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./'));
});

gulp.task('default', [ 'css', 'js', 'min-html' ]);