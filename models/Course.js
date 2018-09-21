const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
  code: {
    type: String
  },
  name: {
    type: String
  },
  college: {
    type: String
  },
  level: {
    type: String
  },
  sections: [{
    type : mongoose.Schema.Types.ObjectId, ref: 'Section'
  }]
});

module.exports = mongoose.model('Course', courseSchema);