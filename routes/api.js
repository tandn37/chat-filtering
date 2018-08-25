const controller = require('../controllers');

module.exports = [
  {
    method: 'post',
    url: '/api/has-banned-words',
    handler: controller.api.hasBadWord
  }
]