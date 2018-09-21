const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

// Models
const User = require('./models/User.js');
const Section = require('./models/Section.js');

var auth = {
  router,
  checkAuthenticated: (req, res, next) => {
    // Check if auth header exists
    if (!req.header('authorization')) {
      return res.status(401).send({ message: 'Unathorized. Missing Auth Header' });
    }

    // Turn auth header into an array,get and decode token
    var token = req.header('authorization').split(' ')[1];

    jwt.verify(token, '123', function(err, verified) {
      if (err) {
        return res.status(401).send({ message: 'Token Expired' });
      } else {
        var payload = jwt.verify(token, '123');

        if (!payload) {
          return res.status(401).send({ message: 'Unathorized. Auth Header Invalid' });
        }

        // Place user id into request
        req.userId = payload.sub;

        next();
      }
    });
  }
};

router.post('/register', async (req, res, next) => {
  let registerData = req.body;
  var references = req.body.references;

  // Validate reference numbers
  if (!references || references.length < 1) {
    return res.status(422).send({ message: 'Reference numbers are required to register' });
  }

  // Create a new user using form data
  var user = await User.create(registerData).catch(next);

  // Update the section's students array with new user's id
  Section.updateMany({ reference: { $in: references } }, { $push: { students: user._id } }, { new: true }).catch(next);

  createSendToken(res, user);
});

router.post(['/login', '/welcome'], (req, res, next) => {
  var loginData = req.body;

  // Find user in database whose email matches form email
  User.findOne({ email: loginData.email }, function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Email is invalid!' });
    }

    // Compare password from form with user's password from database
    bcrypt.compare(loginData.password, user.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Password is invalid!' });
      }

      // Find user by id and update their last login date
      User.findByIdAndUpdate(user._id, { last_login: Date.now() }).catch(next);

      createSendToken(res, user);
    });
  }).catch(next);
});

function createSendToken(res, user) {
  var token = jwt.sign({ sub: user._id }, '123', { expiresIn: '1h' });
  res.status(200).send({ token });
}

// Error handling middleware
router.use(function(err, req, res, next) {
  res.status(422).send({ error: err.message });
});

module.exports = auth;
