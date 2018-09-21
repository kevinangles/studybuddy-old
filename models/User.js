const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'A first name is required to register']
  },
  last_name: {
    type: String,
    required: [true, 'A last name is required to register']
  },
  gender: {
    type: String,
    required: [true, 'A gender is required to register']
  },
  phone_number: {
    type: String,
    required: [true, 'A phone number is required to register']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'An email is required to register']
  },
  password: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/g.test(
          v
        );
      },
      message:
        'Password must contain a minimum of eight characters, including at least one uppercase letter, one lowercase letter, one number and one special character'
    },
    required: [true, 'A password is required to register']
  },
  major: {
    type: String,
    required: [true, 'A major is required to register']
  },
  date_joined: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, null, null, (err, hash) => {
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);
