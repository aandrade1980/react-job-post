const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  title: String,
  company: String,
  email: String,
  description: String,
  imgUrl: String,
  category: String
},
  { timestamps: true }
);

module.exports = mongoose.model('Data', DataSchema);
