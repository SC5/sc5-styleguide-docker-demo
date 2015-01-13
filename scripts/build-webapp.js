var path = require('path'),
    proc = require('./util/process-util'),
    watcher = require('./util/watcher'),
    gulpCmd = path.resolve(__dirname, '../../node_modules/.bin/gulp');

function npmInstall() {
  return proc.spawn('npm', 'install --loglevel info'.split(' '));
}

function npmPrune() {
  return proc.spawn('npm', 'prune --loglevel info --depth 0'.split(' '));
}

function build() {
  return proc.spawn(gulpCmd, ['build']);
}

function onSuccess() {
  console.log('styleguide webapp build OK!');
}

function onError(err) {
  console.error('styleguide webapp build failed: ', err);
  process.exit(getCode(err));
}

function getCode(err) {
  try {
    return parseInt(err, 10);
  } catch (e) {
    return 666;
  }
}

function startWatch() {
  var paths = ['bower.json', 'gulpfile.js', 'package.json', 'lib/app/*', 'lib/app/{assets,js,views}**/*', 'docker/scripts/util/**/*', __filename];
  watcher.exitOnChange(paths);
}

npmInstall().then(npmPrune).then(build).then(startWatch).done(onSuccess, onError);
