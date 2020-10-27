const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pilotuser = Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  crewRole: { type: String },
  password: { type: String },
  keyForNewPassword: { type: String },
});

module.exports = mongoose.model('Pilot_example', pilotuser);
