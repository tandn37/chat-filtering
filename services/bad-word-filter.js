const model = require('../cache');
const util = require('../utils/helper');
let cachedData = {};

function buildData() {
  model.loadData((error, data) => {
    if (error) {
      throw new Error('Error when building words tree');
    }
    cachedData = data;
  });
}
function doesTextContainBadWord(text) {
  if (util.isObjectEmpty(cachedData)) {
    throw new Error('Something went wrong');
  }
  return model.doesTextContainBadWord(cachedData, text);
}

module.exports = { buildData, doesTextContainBadWord }