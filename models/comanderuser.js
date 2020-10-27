const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comanderuser = Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  role: {type: String},
  password: {type: String},
  keyForNewPassword: {type: String},
});

module.exports = mongoose.model('comander_example', comanderuser);
