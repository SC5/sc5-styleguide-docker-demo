'use strict';

var EVERY_30_MINUTES = '0,30 * * * *',
  schedule = require('node-schedule'),
  childProcess = require('child_process'),
  spawn = childProcess.spawn;

scheduleJob();

function scheduleJob() {
  var job = new schedule.Job('git-reset', reset);
  job.on('run', function() {
    setTimeout(function() {
      console.log('finished');
      console.log('next invocation will be on', job.nextInvocation().toString());
    }, 100);
  });
  job.schedule(EVERY_30_MINUTES);
  console.log('scheduled to run every 30 minutes:', EVERY_30_MINUTES);
  console.log('next invocation will be on', job.nextInvocation().toString());
}

function reset() {
  var cmd = 'git',
    args = ['reset', '--hard', 'HEAD'],
    opts = {
      cwd: process.cwd,
      env: process.env,
      stdio: 'inherit'
    };

  console.log('running: "' + ([cmd].concat(args).join(' ')) + '"');
  spawn(cmd, args, opts).on('error', function(err) {
    console.error(cmd, 'failed:', err);
    process.exit(1);
  }).on('exit', function(code) {
    if (code !== 0) {
      console.error(cmd, 'exited with code', code);
      process.exit(code);
    }
  });
}
