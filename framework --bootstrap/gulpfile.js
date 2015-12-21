var gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    imageop = require('gulp-image-optimization'),
    minifyCss = require('gulp-minify-css'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer');

 //*Сжатие картинок
gulp.task('images', function(cb) {
    gulp.src(['i/*.png','i/*.jpg','i/*.gif','src/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('i')).on('end', cb).on('error', cb);
});

//*Сжать css
gulp.task('compress-css', function () {
  return gulp.src('css/style.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('css'))
});

// connect
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});
 
 // styles
gulp.task('css', function () {
  return gulp.src('css/style.css')
    // .pipe(concatCss("bundle.css"))
    // .pipe(gulp.dest('gulp_css/'))
    .pipe(connect.reload());
});

// watch
gulp.task('watch', function() {
  gulp.watch('css/*.css', ['css'])
  gulp.watch('index.html', ['html'])
  gulp.watch('scss/*.scss', ['sass'])
})

// html
gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(connect.reload())
    .pipe(notify("Html compiled"));
})

// SCSS to CSS
gulp.task('sass', function () {

   var onError = function(err) {
        notify.onError({
                    title:    "Gulp",
                    subtitle: "Failure!",
                    message:  "Error: <%= error.message %>",
                    sound:    "Beep"
                })(err);

        this.emit('end');
    };

    gulp.src('scss/style.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 version'] }))
        .pipe(gulp.dest('css'))
        .pipe(connect.reload())
        .pipe(notify("Scss complied"));
});

gulp.task('default', ['connect', 'html', 'css', 'sass', 'watch']);