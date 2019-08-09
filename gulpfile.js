const gulp=require('gulp')
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const image = require('gulp-image');
const browsersync = require('browser-sync').create();

const paths = {
    html: {
        src: 'app/*.html',
        dest: 'build/'
    },
    styles: {
        src: 'app/css/*.css',
        dest: 'build/css/'
    },
    fonts: {
        src: 'app/css/font/*.*',
        dest: 'build/css/font/'
    },

    images: {
        src: 'app/css/img/*.*',
        dest: 'build/css/img'
    }
}

function browserSync(done){
    browsersync.init({
        server: {
            baseDir: './build'
        },
        port: 3000
    })
    done();
}

function browserSyncReload(done){
    browsersync.reload();
    done();
}

function html() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browsersync.stream())
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(cssnano())
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browsersync.stream())
}

function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(browsersync.stream())
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(image())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browsersync.stream())
}

function watch() {
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.images.src, images);
    gulp.watch('./app/*.html', gulp.series(browserSyncReload));
}

const build = gulp.parallel(html, styles, fonts, images);

gulp.task('build', build);

gulp.task('default', gulp.parallel(watch, build, browserSync))