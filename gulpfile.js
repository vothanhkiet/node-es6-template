/**
 * Created by kiettv on 01/12/2015.
 */
'use strict';
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const del = require('del');
const zip = require('gulp-zip');

// Remove the built files
gulp.task('clean', (cb) => {
    del(['dist'], cb);
    del(['release'], cb);
});

gulp.task('copy-package.json', () => {
    return gulp.src('package.json')
        .pipe(gulp.dest('dist'))
});

gulp.task('copy-files', () => {
    return gulp.src(['src/**/*.*', '!src/**/*.js'])
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['copy-package.json', 'copy-files'], () => {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '../src'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.*', ['build']);
});

gulp.task('release', ['build'], () => {
    return gulp.src('dist/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('release'));
});

gulp.task('default', ['build']);
