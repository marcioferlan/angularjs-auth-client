var gulp = require('gulp');
var bower = require('gulp-bower');
var del = require('del');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var runSequence = require('run-sequence');

var config = {
    bowerDir: './bower_components',
    srcDir: 'src',
    buildDir: 'build',
    vendorLibs: [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap/dist/css/bootstrap.css',
        './bower_components/bootstrap/dist/css/bootstrap.css.map',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js'
    ],
    watchBuild: ['app/**/*.html', 'static/**/*.js', 'static/**/*.css'],
    watchSrc: ['app/**/*.html', 'app/**/*.js'],
    lint: ['gulpfile.js', './src/**/*.js'],
    scripts: './src/**/*.js',
    templates: './src/**/*.html'
};

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});

gulp.task('clean', function(cb) {
    del(config.buildDir, cb);
});

gulp.task('lint', function() {
    return gulp.src(config.lint)
                .pipe(jshint())
                .pipe(jshint.reporter(stylish))
                .pipe(jshint.reporter('fail'));
});

gulp.task('copy', function() {
    return gulp.src(config.vendorLibs)
                .pipe(gulp.dest(config.buildDir + '/static/'));
});

gulp.task('scripts', function() {
    return gulp.src(config.scripts)
                .pipe(concat('angularjs-auth-client.js'))
                .pipe(gulp.dest(config.buildDir + '/static/'));
});

gulp.task('templates', function() {
    return gulp.src(config.templates)
                .pipe(gulp.dest(config.buildDir));
});

// watch files for changes and reload
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: config.buildDir
        }
    });

    gulp.watch(config.watchBuild, {cwd: config.buildDir}, browserSync.reload);
});

gulp.task('default', function() {
    runSequence('lint', ['copy', 'scripts', 'templates']);
});

gulp.task('watch', function() {
    gulp.watch(config.watchSrc, {cwd: config.srcDir}, ['default']);
});

