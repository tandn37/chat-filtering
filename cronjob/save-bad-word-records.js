const redisHelper = require('../models/redis');
const mongoHelper = require('../models/mongo');
const async = require('async');
const CONCURRENT_LIMIT = 5;

function start() {
  console.log('Get Bad Word Records Worker Started');
  redisHelper.getBadWordRecords((err, records) => {
    if (err) {
      return;
    }
    console.log('Current records', records);
    const userIds = Object.keys(records);
    async.eachLimit(userIds, CONCURRENT_LIMIT, (userId, callback) => {
      mongoHelper.saveUserRecord(userId, records[userId], (error) => {
        if (error) {
          console.log(error);
        }
        callback();
      });
    }, () => {
      console.log('Worker Bad Word Records Runned Successfully!');
    });
  });
}
module.exports = { start };