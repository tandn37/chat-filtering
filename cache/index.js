const model = require('./in-memory-cache');

function loadData(callback) {
  model.loadData(callback);
}

function doesTextContainBadWord(tree, text) {
  return model.doesTextContainBadWord(tree, text);
}

module.exports = { loadData, doesTextContainBadWord };