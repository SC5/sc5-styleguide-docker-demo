'use strict';

var Q = require('q'),
    spawn = require('child_process').spawn,
    spawnOpts = {
      cwd: process.cwd,
      env: process.env,
      stdio: 'pipe'
    };

module.exports = {
  spawn: spawnProcess
};

function spawnProcess(cmd, args) {
  console.log('running: "' + ([cmd].concat(args).join(' ')) + '"');
  return Q.promise(function(resolve, reject) {
    var child = spawn(cmd, args, spawnOpts)
      .once('error', function(err) {
        reject(err.toString());
      })
      .once('exit', function(code, signal) {
        if (code === 0) {
          resolve();
        } else {
          reject(code || signal);
        }
      });

    if (child.stdout) {
      child.stdout.on('data', function(out) {
        console.log(out.toString());
      });
    }

    if (child.stderr) {
      child.stderr.on('data', function(err) {
        console.error(err.toString());
      });
    }

  });
}
