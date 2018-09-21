const mongoose = require('mongoose');

var sectionSchema = new mongoose.Schema({
  reference: {
    type: Number
  },
  professor: {
    type: String
  },
  type: {
    type: String
  },
  students: [{
    type : mongoose.Schema.Types.ObjectId, ref: 'User'
  }]
});

module.exports = mongoose.model('Section', sectionSchema);