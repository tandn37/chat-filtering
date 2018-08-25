const controller = require('../controllers');

module.exports = [
  {
    method: 'post',
    url: '/worker/save-bad-users',
    handler: controller.cronTrigger.saveBadUsers
  }
]

