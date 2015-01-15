var path = require('path'),
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  styleguide = require('sc5-styleguide'),
  rootSrc = path.resolve('.', 'demo-input'),
  source = path.join(rootSrc, 'sass/**/*.scss'),
  outputPath = 'demo-output',
  sassOpts = {
    includePaths: require('node-neat').includePaths,
    errLogToConsole: true
  },
  watchTimerId;

gulp.task('styleguide:generate', function() {
  var pkg = require(path.resolve(__dirname, 'node_modules/sc5-styleguide/package.json'));
  return gulp.src(source)
    .pipe(styleguide.generate({
      title: pkg.name + ' ' + pkg.version + ' demo',
      server: true,
      port: process.env.SG_PORT,
      rootPath: outputPath,
      overviewPath: path.join(rootSrc, 'README.md'),
      styleVariables: path.join(rootSrc, 'sass/_styleguide_variables.scss')
    }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src(path.join(rootSrc, 'sass/app.scss'))
    .pipe(sass(sassOpts))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:static', function() {
  gulp.src(path.join(rootSrc, 'demo/**/*'))
    .pipe(gulp.dest(path.join(outputPath, 'demo')));
});

gulp.task('watch', ['styleguide'], function() {
  gulp.watch(source, throttleStyleguideBuild);
});

gulp.task('styleguide', ['styleguide:static', 'styleguide:applystyles', 'styleguide:generate']);

function throttleStyleguideBuild() {
  clearTimeout(watchTimerId);
  watchTimerId = setTimeout(function() {
    gulp.start('styleguide');
  }, 500);
}
