#!/usr/bin/env node

'use strict';

var path = require('path'),
    gulp = require('gulp'),
    rootSrc = path.resolve(__dirname, '../node_modules/sc5-styleguide'),
    rootDest = path.resolve(__dirname, '../demo-input'),
    styleSrc = path.resolve(rootSrc, 'lib/app/sass/**'),
    styleDest = path.join(rootDest, 'sass');

copy(styleSrc, styleDest);
copy(path.join(rootSrc, 'README.md'), rootDest);
copy(path.join(rootSrc, 'lib/demo/**/*'), path.join(rootDest, 'demo'));

function copy(src, dest) {
  console.log('copying', src, 'to', dest);
  gulp.src(src).pipe(gulp.dest(dest));
}
