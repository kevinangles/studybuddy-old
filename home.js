const express = require('express');
const router = express.Router();

// Models
const User = require('./models/User.js');
const Course = require('./models/Course.js');
const Section = require('./models/Section.js');

// Routers
const auth = require('./auth.js');

var home = { router };

router.get('/home', auth.checkAuthenticated, async (req, res) => {
  // Find the ids of sections where the user is a student
  var sectionsObj = await Section.find({ students: req.userId }, '_id');

  if (!sectionsObj) {
    return res.status(422).send({ message: 'User is not part of any sections!' })
  }

  // Map array of section documents into array of section ids
  var sections = await sectionsObj.map(function (obj) { return obj.id; });

  // Find the ids of courses that offer the user's sections
  var courses = await Course.find({ sections: { $in: sections } }, '-_id -sections');

  return res.status(200).send(courses);
});

router.get('/results/:code', async (req, res) => {
  // Find a course document using course code from url
  var course = await Course.findOne({ code: req.params.code.toUpperCase() });

  // Find all the sections that belong to the course and populate the students array with student document
  var sections = await Section.find({ _id: { $in: course.sections } }).populate('students', 'id first_name last_name');

  return res.status(200).send(sections);
});

router.get('/profile/:id', async (req, res) => {
  try {
    var user = await User.findById(req.params.id, '-password -__v');
    res.send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = home;
