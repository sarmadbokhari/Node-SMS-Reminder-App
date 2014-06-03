var mongoose = require('mongoose');

module.exports = mongoose.model('Reminder', {
  sender: String,
  number: Number,
  message: String,
  time: Number
});
