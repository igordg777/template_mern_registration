const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const router = express.Router();
const Pilot = require('../models/pilotuser');
const Comander = require('../models/comanderuser');
const sessionChecker = require('../middleware/auth');

const saltRounds = 10;

router.post('/api/signup', async (req, res, next) => {
  const { email } = req.body;

  const dbemailComander = await Comander.findOne({ email });
  const dbemailPilot = await Pilot.findOne({ email });

  if ((dbemailComander && dbemailComander.email === email) ||
    (dbemailPilot && dbemailPilot.email === email)) {
    res.status(400).json({ response: 'emailExist' });
  } else {
    res.status(200).json({ response: 'success' });
  }
}).post('/api/signup/noowner', async (req, res, next) => {

  const { email, firstName, lastName, password, crewRole } = req.body;

  try {
    const anketa = new Pilot({
      email, firstName, lastName, password: await bcrypt.hash(password, saltRounds),
      keyForNewPassword: '', crewRole,
    });

    req.session.user = anketa;

    await anketa.save();
    res.status(200).json({ response: 'success' });
  } catch (e) {
    res.status(400).json({ response: 'fail' });
  }
}).post('/newPassword', async (req, res) => {
  function gen_password(len) {
    var password = '';
    var symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < len; i++) {
      password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    return password;
  }

  let key = gen_password(20);

  const { email } = req.body;

  try {

    const userComander = await Comander.findOne({ email });

    const userPilot = await Pilot.findOne({ email });
    if (userComander) {
      userComander.keyForNewPassword = key;
      await userComander.save();
    } else if (userPilot) {
      userPilot.keyForNewPassword = key;
      await userPilot.save();
    } else {
      res.status(400).json({ response: 'Неправильно указан email!' });
    }

    async function main() {
      let testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
          user: 'R00MR00M',
          pass: 'iremoormoor',
        },
      });

      let info = await transporter.sendMail({
        from: '"IBMiX 👻" <R00MR00M@yandex.ru>', // sender address
        to: `${email}`,  // list of receivers  user2.email,
        subject: 'IBMiX ✔', // Subject line
        text: 'Текст1', // plain text body
        html:
          `Для создания нового пароля перейдите по этой  <a href="http://домен нашего будущего сайта IBMiX/set_new_password/${key}">ссылке</a>
           
    `,
      });


    }

    main().catch(console.error);

    res.status(200).json({ response: 'success' });
  } catch (e) {


    res.status(400).json({ response: 'fail' });
  }
}).post('/set_new_password/', async (req, res) => {

  try {
    let keyForNewPassword = req.body.keyForNewPassword;
    const userComander = await Comander.findOne({ keyForNewPassword });

    const userPilot = await Pilot.findOne({ keyForNewPassword });
    if (userComander) {
      userComander.password = await bcrypt.hash(req.body.password, saltRounds);
      await userComander.save();
      res.status(200).send({ response: 'ok' });
    } else if (userPilot) {

      userPilot.password = await bcrypt.hash(req.body.password, saltRounds);
      await userPilot.save();
      res.status(200).send({ response: 'ok' });
    }

  } catch (e) {

    res.status(400).json({ response: 'fail' });
  }
}).post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userComander = await Comander.findOne({ email });

    const userPilot = await Pilot.findOne({ email });
    if (userComander &&
      (await bcrypt.compare(password, userComander.password))) {
      req.session.user = userComander;

      res.status(200).
        json({
          response: 'success',
          crewRole: userComander.crewRole,
          town: userComander.town,
        });
    } else if (userPilot &&
      (await bcrypt.compare(password, userPilot.password))) {
      req.session.user = userPilot;

      res.status(200).
        json({
          response: 'success',
          crewRole: userPilot.crewRole,
          town: userPilot.town,
        });
    } else {

      res.status(400).json({ response: 'fail' });
    }
  } catch (e) {
    res.status(400).json({ response: 'fail' });
  }
}).get('/api/logout', async (req, res, next) => {
  try {
    await req.session.destroy();
    res.clearCookie('user_sid');
    res.status(200).json({ response: 'success' });
  } catch (error) {
    res.status(400).json({ response: 'fail' });
  }
});

module.exports = router;
