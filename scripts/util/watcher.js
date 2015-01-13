'use strict';

var path = require('path'),
    vfs = require('vinyl-fs'),
    rootPath = path.resolve(__dirname, '../../..');

module.exports = {
  onChange: function onChange(paths, fn) {
    var globs = paths.map(relativeToRoot);
    console.log('watching:\n' + globs.join('\n'));
    vfs.watch(globs, fn);
  },
  exitOnChange: function exitOnChange(paths, delayBeforeExit) {
    var delay = delayBeforeExit || 0;
    this.onChange(paths, function(evt) {
      console.log(evt.path, 'changed, restarting after', delay, 'ms');
      setTimeout(function() {
        process.exit(0);
      }, delay);
    });
  }
};

function relativeToRoot(p) {
  return path.resolve(rootPath, p);
}
