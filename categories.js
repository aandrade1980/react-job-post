const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  label: String
});

module.exports = mongoose.model('Category', DataSchema);
