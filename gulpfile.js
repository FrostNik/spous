const
    gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    watch = require("gulp-watch"),
    sass = require("gulp-sass"),
    autoPrefix = require("gulp-autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),
    notify = require("gulp-notify"),
    plumber = require("gulp-plumber"),
    fileInclude = require("gulp-file-include"),
    rename = require("gulp-rename"),
    minify = require("gulp-minify"),
    concat = require('gulp-concat');

gulp.task("jsComp", function () {
    return gulp.src([/*"./devel/js/jquery.js","./devel/js/slick.min.js", "./devel/js/rotate.js", "./devel/js/script.js", "./devel/js/jquery.nice-select.min.js",*/ "./devel/js/main.js"] /*"./devel/js/*.js"*/)
        .pipe(concat('main.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            ignoreFiles: ['-min.js']
        }))
        .pipe(gulp.dest("./docs/js/"));
});

gulp.task("html", function () {
    return gulp.src("./devel/*.html")
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: "HTML Include",
                    sound: true,
                    message: err.message
                }
            })
        }))
        .pipe(fileInclude({
            prefix: "@@"
        }))
        .pipe(gulp.dest("./docs/"));
});

gulp.task("scssComp", function () {
    return gulp.src("./devel/style.scss")
        .pipe(sourcemaps.init())
        .pipe(autoPrefix({
            overrideBrowserslist: ["last 4 versions"]
        }))
        .pipe(sass({outputStyle: 'compressed'}))
        // .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe( gulp.dest("./docs/css/"));
});

gulp.task("watch", function () {
    watch(["./docs/*.html", "./docs/css/**/*.css", "./docs/js/**/*.js"], gulp.parallel( browserSync.reload ));
    watch("./devel/**/*.scss", gulp.parallel("scssComp"));
    watch("./devel/js/**/*.js", gulp.parallel("jsComp"));
    watch("./devel/*.html", gulp.parallel("html"));
});

gulp.task("server", function () {
    browserSync.init({
        server: {
            baseDir: "./docs/"
        }
    })
});

gulp.task("default", gulp.parallel("server", "watch", "scssComp", "html", "jsComp"));