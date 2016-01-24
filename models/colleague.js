var mongoose = require('mongoose');

var colleagueSchema = new mongoose.Schema({
  colleagueId: { type: String, unique: true, index: true },
  name: String,
  gender: String,
  shortName: String,
});

module.exports = mongoose.model('Colleague', colleagueSchema);