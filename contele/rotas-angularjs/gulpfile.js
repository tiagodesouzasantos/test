const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    wait = require('gulp-wait'),
    imagemin = require('gulp-imagemin'),
    webserver = require('gulp-webserver'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync').create();

var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var bytediff = require('gulp-bytediff');

//SASS
gulp.task('sass', function() {
    return gulp.src('./sass/main.scss')
        .pipe(wait(500))
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions', '> 5%', 'Firefox ESR']
        }))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});
gulp.task('sass-watch', ['sass'], function() {
    gulp.watch('./sass/**/*.scss', ['sass'])
});


//IMAGES
gulp.task('img', function() {
    gulp.src(['./img/*.jpg', './img/*.png', './img/*.svg'])
        .pipe(imagemin())
        .pipe(gulp.dest('./img/'));
});

// MINIFICANDO APP JS
// https://medium.com/@YOzaz/generation-angularjs-production-files-with-gulp-12214f076a50
gulp.task('app', function() {
    return gulp.src([
            "js/config.js",
            "modules/_app/js/mainConfig.js",
            "modules/initial/js/initialController.js",
            "modules/home/js/homeController.js",
            "modules/menu/js/menuController.js",
            "modules/home/js/homeService.js",
            "modules/initial/js/initialService.js",
            "modules/_app/js/services/dbServerService.js",
            "modules/_app/js/services/appUrlsService.js",
            "modules/_app/js/services/dialogService.js",
            "modules/_app/js/services/errorRequestService.js",
            "modules/_app/js/services/msgsService.js",
            "modules/_app/js/services/mapsService.js",
            "modules/_app/js/services/sessionDataService.js",
            "modules/_app/js/services/timeService.js",
            "modules/_app/js/services/authService.js"
        ])
        .pipe(plumber())
        .pipe(concat('app.js', { newLine: ';' }))
        .pipe(ngAnnotate({ add: true }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('js/dist/'));
});

gulp.task('prod', ['app'], function() {
    return gulp.src('js/dist/app.js')
        .pipe(plumber())
        .pipe(bytediff.start())
        .pipe(uglify({ mangle: true }))
        .pipe(bytediff.stop())
        .pipe(rename('app.min.js'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('js/dist/'));
});

gulp.task('watch', ['prod'], function() {
    return gulp.watch('./modules/**/*.js', ['prod']);
});

//SERVER
gulp.task('server', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("css/*.css").on('change', browserSync.reload);
    gulp.watch("js/dist/*.js").on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./modules/**/*.html").on('change', browserSync.reload);
    gulp.watch("./modules/**/*.htm").on('change', browserSync.reload);
    gulp.watch("./modules/**/*.js").on('change', browserSync.reload);
    gulp.watch("./modules/**/**/*.html").on('change', browserSync.reload);
    gulp.watch("./modules/**/**/*.js").on('change', browserSync.reload);

});

// Default task
gulp.task('default', ['sass-watch', 'img', 'server', 'watch', 'app']);