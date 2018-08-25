const mongoose = require('mongoose');
const config = require('../config/config.dev');
const Schema = mongoose.Schema;

const UserWithBadWords = new Schema({
  user_id: { type: String, index: true },
  count: Number
});

const UserModel = mongoose.model(config.mongo.database, UserWithBadWords);
mongoose.connect(config.mongo.uri);

function saveUserRecord(userId, record, callback) {
  UserModel.findOneAndUpdate(
    { user_id: userId },
    { user_id: userId, count: record },
    { upsert: true },
    callback);
}

module.exports = { saveUserRecord };