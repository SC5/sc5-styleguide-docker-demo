'use strict';

var EVERY_30_MINUTES = '0,30 * * * *',
    AT_MIDNIGHT      = '0 0 * * *',
    schedule = require('node-schedule'),
    proc = require('./util/process-util'),
    watcher = require('./util/watcher');

watcher.exitOnChange([__filename], 'docker/scripts/util/**/*');
scheduleJob('git-pull', AT_MIDNIGHT, pull);
scheduleJob('git-reset', EVERY_30_MINUTES, reset);

function pull() {
  return proc.spawn('git', ['pull', '--force']);
}

function reset() {
  return proc.spawn('git', ['reset', '--hard', 'HEAD']);
}

function scheduleJob(name, cronPattern, fn) {
  var job = new schedule.Job(name, wrap(fn));
  job.on('run', function() {
    setTimeout(function() {
      console.log(name, 'finished');
      console.log(name, 'next invocation will be on', job.nextInvocation().toString());
    }, 100);
  });
  job.schedule(cronPattern);
  console.log(name, 'scheduled to run at', cronPattern);
  console.log(name, 'next invocation will be on', job.nextInvocation().toString());
  return job;
}

function wrap(fn) {
  return function() {
    fn().done(undefined, function(err) {
      if (err) {
        console.error('terminated with code or signal', err);
      }
      process.exit(666);
    });
  };
}
