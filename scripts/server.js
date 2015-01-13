'use strict';

var DELAY_BEFORE_RESTART = 15000,
    gulp = require('gulp'),
    watcher = require('./util/watcher');

watcher.exitOnChange([__filename, 'docker/scripts/util/**/*']);
watcher.exitOnChange(['demo-gulpfile.js', 'package.json', 'lib/*', 'lib/demo/**/*', 'lib/modules/**/*'], DELAY_BEFORE_RESTART);

require('../../demo-gulpfile.js');
gulp.start('watch');
