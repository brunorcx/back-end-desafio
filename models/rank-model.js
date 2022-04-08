var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var rankingSchema = new Schema({
  playerName: String,
  score: String,
  date: String,
});
module.exports = mongoose.model("Rank", rankingSchema);
