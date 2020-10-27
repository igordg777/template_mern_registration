const express = require('express');
const path = require('path');
require('dotenv').config();
const indexRouter = require('./routes/index');
const nodemailer = require('nodemailer');
const authenticationRouter = require('./routes/authentication');
const users2 = require('./routes/users');
const getForDashboard = require('./routes/getForDashboard');
const seeders = require('./seeders/seeder');

const userMiddleWare = require('./middleware');
const useErrorHandlers = require('./middleware/error-handlers');

const app = express();

userMiddleWare(app);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(express.static(path.join(__dirname, 'client/frontend/build')));

app.use('/', indexRouter);
app.use('/', authenticationRouter);
app.use('/', users2);
// app.use('/', getForDashboard);

app.get('*', (req, res) => {
  let path;
  res.sendFile(`${__dirname}/client/frontend/build/index.html`);
});
useErrorHandlers(app);

module.exports = app;
