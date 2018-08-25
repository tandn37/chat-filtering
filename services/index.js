const badWordFilterService = require('./bad-word-filter');

function init() {
  badWordFilterService.buildData();
}

module.exports = { init };