var path = require('path'),
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  styleguide = require('sc5-styleguide'),
  styleguideDir = path.resolve(__dirname, '../node_modules/sc5-styleguide'),
  source = path.join(styleguideDir, 'lib/app/**/*.scss'),
  outputPath = path.resolve(__dirname, '../demo-output');

gulp.task('styleguide:generate', function() {
  return gulp.src(source)
    .pipe(styleguide.generate({
      title: 'SC5 Style Guide Demo',
      server: true,
      rootPath: outputPath,
      overviewPath: path.join(styleguideDir, 'README.md')
    }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src(path.join(styleguideDir, 'lib/app/sass/app.scss'))
    .pipe(sass({
      includePaths: [
        path.join(styleguideDir, 'node_modules/node-bourbon/assets/stylesheets'),
        path.join(styleguideDir, 'node_modules/node-neat/assets/stylesheets')
      ]
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide', ['styleguide:static', 'styleguide:generate', 'styleguide:applystyles']);

gulp.task('styleguide:static', function() {
  gulp.src(path.join(styleguideDir, 'lib/demo/**'))
    .pipe(gulp.dest(path.join(outputPath, 'demo')));
});

gulp.task('watch', ['styleguide'], function() {
  gulp.watch(source, ['styleguide']);
});

gulp.start('watch');
