var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var exec = require('child_process').exec;

var paths = {
  sass: ['./scss/**/*.scss'],
  js: [
    'www/lib/ionic/js/ionic.bundle.js',
    'www/lib/ng-lodash/build/ng-lodash.min.js',
    'www/cordova.js',
    'www/lib/collide/collide.js',
    'www/lib/ionic-ion-tinder-cards/ionic.tdcards.js',
    'www/js/app.js',
    'www/components/*/*.js',
    'www/js/services/*.js',
  ]
};

gulp.task('default', ['server', 'scripts', 'watch']);

gulp.task('server', function(cb) {
  exec('node hooks/before_serve/emulator.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['scripts']);
});

gulp.task('scripts', function() {
  gulp.src(paths.js)
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('www/dist'));
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
