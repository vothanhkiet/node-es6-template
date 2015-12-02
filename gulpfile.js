/**
 * Created by kiettv on 01/12/2015.
 */
'use strict';
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const del = require('del');
const zip = require('gulp-zip');
const jEditor = require('gulp-json-editor');
const bump = require('gulp-bump');

// Remove the built files
gulp.task('clean', (cb) => {
    del(['dist'], cb);
    del(['release'], cb);
});

// Will patch the version
gulp.task('bump-patch', function () {
    gulp.src('package.json')
        .pipe(bump())
        .pipe(gulp.dest('.'));
});

gulp.task('bump-minor', function () {
    gulp.src('package.json')
        .pipe(bump({type: 'minor'}))
        .pipe(gulp.dest('.'));
});

gulp.task('bump-major', function () {
    gulp.src('package.json')
        .pipe(bump({type: 'major'}))
        .pipe(gulp.dest('.'));
});

gulp.task('copy-package.json', () => {
    gulp.src('package.json')
        .pipe(jEditor(json => {
            json.devDependencies = {};
            return json;
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task('copy-files', () => {
    return gulp.src(['src/**/*.*', '!src/**/*.js'])
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['copy-files'], () => {
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

gulp.task('release', ['build', 'copy-package.json'], () => {
    return gulp.src('dist/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('release'));
});

gulp.task('release-patch', ['bump-patch', 'release']);
gulp.task('release-minor', ['bump-minor', 'release']);
gulp.task('release-major', ['bump-major', 'release']);

gulp.task('default', ['build']);
