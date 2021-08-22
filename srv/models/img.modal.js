const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imgSchema = new Schema({
  tag: String,
  url: String,
  date:{type:Date , default:Date.now},
});

const eventData = mongoose.model("imgtag", imgSchema);

module.exports = eventData;
