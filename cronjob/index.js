var CronJob = require('cron').CronJob;

const saveBadWordRecordsCron = require('./save-bad-word-records');

const schedules = [
  {
    time: '00 00 00 * * *',
    handler: saveBadWordRecordsCron.start
  }
];

function init(params) {
  console.log('Cron jobs started');
  schedules.forEach((schedule) => {
    const job = new CronJob(schedule.time, schedule.handler);
    job.start();
  });
}

module.exports = { init };