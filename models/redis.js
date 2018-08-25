const config = require('../config/config.dev');
const redis = require('redis');
const client = redis.createClient(config.redis);

const BAD_USER_IDS_KEY = 'hash:bad:user:ids';

function increaseCountForUser(userId, callback) {
  if (!userId) {
    throw new Error('User id is invalid');
  }
  client.hincrby(BAD_USER_IDS_KEY, userId, 1, callback);
}

function getBadWordRecords(callback) {
  client.hgetall(BAD_USER_IDS_KEY, callback);
}

client.on('error', (error) => {
  console.log(error);
});
module.exports = { increaseCountForUser, getBadWordRecords };