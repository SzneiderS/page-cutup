const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const imagemin = require('gulp-imagemin');

gulp.task('sass', function () {
    return gulp.src('./src/css/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('js', function () {
    return gulp.src(['./src/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('js-bundle', function () {
    return gulp.src('./dist/js/*.js')
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('css-bundle', function () {
    return gulp.src('./dist/css/*.css')
        .pipe(concatCss("./styles.css"))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('img_minimize', function () {
    return gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img/'));
});


gulp.task('build', gulp.parallel(
	gulp.series('sass', 'css-bundle'),
	gulp.series('js', 'js-bundle'),
	gulp.series('img_minimize'))
);

gulp.task('watch', function () {
    gulp.watch('./src/css/*.scss', gulp.series('sass', 'css-bundle'));
    gulp.watch('./src/js/*.js', gulp.series('js', 'js-bundle'));
    gulp.watch('./src/img/*', gulp.series('img_minimize'));
});

gulp.task('default', gulp.series('build', 'watch')
);
