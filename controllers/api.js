const redisHelper = require('../models/redis');
const badWordFilterService = require('../services/bad-word-filter');

function hasBadWord(request, response) {
  const { user_id, text } = request.body;
  if (!user_id || !text) {
    return response.end('false');
  }
  console.log(user_id, text);
  const result = badWordFilterService.doesTextContainBadWord(text);
  if (result) {
    redisHelper.increaseCountForUser(user_id);
  }
  response.end(result.toString());
}

module.exports = { hasBadWord };