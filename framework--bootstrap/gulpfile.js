var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require("browser-sync"),
    autoprefixer = require('gulp-autoprefixer');

var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var notifier = require('node-notifier');
var reload = browserSync.reload;
var onError = function (err) {
    notify.onError({
        title: "Gulp",
        subtitle: "Failure!",
        message: "Error: <%= error.message %>",
        sound: "Beep"
    })(err);

    this.emit("end");
};

// SASS
gulp.task("sass", function () {
    return gulp.src("sass/screen.sass")
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass({
            // includePaths: ["media/sass"],
            // outputStyle: "nested"
            outputStyle: "compressed"
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions', '> 5%'],
            cascade: false
        }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("css"))
        .pipe(notify({
            'title': 'Gulp-message',
            'message': 'SASS compiled!',
            onLast: true
        }))
        .pipe(browserSync.stream());
});

gulp.task("default", ["sass"], function () {
//Browser reload init
    browserSync.init({
        server: "./"
    });
    /*watchers*/
    gulp.watch("sass/**", ["sass"]);

    notifier.notify({ title: 'Gulp is started', message: 'Woohoo!' });
});