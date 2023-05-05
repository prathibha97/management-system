const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  name: String,
  value: String,
});

module.exports = mongoose.model('Token', tokenSchema);