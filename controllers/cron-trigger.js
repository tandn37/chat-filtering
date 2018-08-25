const saveBadWordRecords = require('../cronjob/save-bad-word-records');

function saveBadUsers(request, response) {
  saveBadWordRecords.start();
  response.end('Processing!');
}

module.exports = { saveBadUsers };