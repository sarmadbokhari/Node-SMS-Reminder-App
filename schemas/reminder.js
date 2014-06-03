var mongoose = require('mongoose');

module.exports = mongoose.model('Reminder', {
  sender: String,
  number: Number,
  message: String,
  date: String,
  Time: Number
});
