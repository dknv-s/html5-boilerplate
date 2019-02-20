const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const browserSync = require('browser-sync').create();

const dirs = {
  src: {
    html: './src/*.html',
    styles: './src/sass/*.scss',
    scripts: './src/js/*.js',
    imgs: './src/img/*.*'
  },
  dist: {
    html: './dist/',
    styles: './dist/css/',
    scripts: './dist/js/',
    imgs: './dist/img/'
  }
}

/* BrowserSync */
function browserSyncInit(done) {
  browserSync.init({
    server: {
      baseDir: './app/dist'
    },
    port: 3000
  });
  done();
}

/* Html */
function html() {
  return gulp.src(dirs.src.html)
    .pipe(gulp.dest(dirs.dist.html))
    .pipe(browserSync.stream());
}

/* Styles */
function scssCompile() {
  return gulp.src(dirs.src.styles)
    .pipe(sass())
    .pipe(gulp.dest(dirs.dist.styles))
    .pipe(browserSync.stream());
}

/* Images */
function images() {
  return gulp.src(dirs.src.imgs)
    .pipe(gulp.dest(dirs.dist.imgs))
    .pipe(browserSync.stream());
}

function watcher(done) {
  gulp.watch(dirs.src.html, gulp.series(html));
  gulp.watch(dirs.src.styles, gulp.series(scssCompile));
  gulp.watch(dirs.src.imgs, gulp.series(images));
  done();
}

/* Tasks */
const build = gulp.parallel(html, scssCompile, images);
const watch = gulp.series(build, browserSyncInit, watcher);

exports.build = build;
exports.watch = watch;
exports.default = watch;
