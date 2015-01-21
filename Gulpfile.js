var path = require('path'),
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  styleguide = require('sc5-styleguide'),
  rootSrc = path.resolve('.', 'demo-input'),
  source = path.join(rootSrc, 'sass/**/*.scss'),
  outputPath = 'demo-output',
  sassOpts = { includePaths: require('node-neat').includePaths },
  watchTimerId;

gulp.task('styleguide:generate', function() {
  var pkg = require(path.resolve(__dirname, 'node_modules/sc5-styleguide/package.json'));
  return gulp.src(source)
    .pipe(styleguide.generate({
      title: pkg.name + ' ' + pkg.version + ' demo',
      server: true,
      port: process.env.SG_PORT || 3210,
      rootPath: outputPath,
      overviewPath: path.join(rootSrc, 'README.md'),
      styleVariables: path.join(rootSrc, 'sass/_styleguide_variables.scss'),
      extraHead: [
        '<link rel="stylesheet" type="text/css" href="/popup/popup.css">',
        '<script src="/popup/popup.js"></script>'
      ]
    }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src(path.join(rootSrc, 'sass/app.scss'))
    .pipe(sass(sassOpts).on('error', logError))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:static', ['copy:popup'], function() {
  return gulp.src(path.join(rootSrc, 'demo/**/*'))
    .pipe(gulp.dest(path.join(outputPath, 'demo')));
});

gulp.task('copy:popup', function() {
  return gulp.src('popup/**/*').pipe(gulp.dest(path.join(outputPath, 'popup')));
});

gulp.task('watch', ['styleguide'], function() {
  return gulp.watch(source, throttleStyleguideBuild);
});

gulp.task('styleguide', ['styleguide:static', 'styleguide:applystyles', 'styleguide:generate']);

function throttleStyleguideBuild() {
  clearTimeout(watchTimerId);
  watchTimerId = setTimeout(function() {
    //TODO: this is an ugly hack which works for now since Gulp extends Orchestrator, but might not work in the future
    gulp.start('styleguide');
  }, 500);
}

function logError(err) {
  console.error('Error while processing sass:', err);
}
