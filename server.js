const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const auth = require('./auth.js');
const home = require('./home.js');

mongoose.Promise = Promise;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  'mongodb://admin:abcd1234@ds139960.mlab.com:39960/studybuddy',
  { useNewUrlParser: true },
  err => {
    if (!err) {
      console.log('Connected to mLab');
    }
  }
);

app.use('/auth', auth.router);
app.use('/home', home.router);

app.listen(3000);
