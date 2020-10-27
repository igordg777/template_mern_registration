var express = require("express");
var router = express.Router();
const sessionChecker = require("../middleware/auth");

const Comander = require("../models/comanderuser")
const Pilot = require("../models/pilotuser")


router.get("/api/profilePilot", sessionChecker, async (req, res, next) => {
  try {
    const { email } = req.session.user;
    const userMainInfo = await Pilot.findOne({ email });

    const {
      firstName,
      lastName,
      patronymic,
      crewRole,
      standingFromDate,
      standingFromDateInRole,
      reliabilityIndex,
      rewardsAndPunishments,
      phone,
      keyForNewPassword,
      wishForm,
      arrWish,
      flagVisit,
      arrFlights
    } = userMainInfo;


    const user = {
      firstName,
      lastName,
      patronymic,
      crewRole,
      standingFromDate,
      standingFromDateInRole,
      reliabilityIndex,
      rewardsAndPunishments,
      phone,
      keyForNewPassword,
      email,
      wishForm,
      arrWish,
      flagVisit,
      arrFlights
    };

    res.status(201).json({ response: user });
  } catch (e) {
    res.status(400).json({ response: "fail" });
  }
});





router.post("/expierence/pilot", sessionChecker, async (req, res, next) => {
  try {
    const { email } = req.session.user;

    const flagVisit = true;

    await Pilot.updateOne(
      { email },
      {
        $set: {
          flagVisit,
        }
      }
    );
    res.status(200).json({ response: 'success' });
  } catch (e) {
    res.status(400).json({ response: "fail" });
  }
});




router.post("/api/pilot/edit", sessionChecker, async (req, res, next) => {
  try {
    const current_email = req.session.user.email;

    const {
      firstName,
      lastName,
      crewRole,
      email,
      phone
    } = req.body.editUser;


    await Pilot.updateOne(
      { email: current_email },
      {
        $set: {
          firstName,
          lastName,
          crewRole,
          email,
          phone
        }
      }
    );

    //Можно ли так делать?
    req.session.user.email = email;
    req.session.user.phone = phone;

    res.status(200).json({ response: 'success' });
  } catch (e) {
    res.status(400).json({ response: "fail" });
  }
});



router.post("/api/comander/edit", sessionChecker, async (req, res, next) => {
  try {
    const { email } = req.session.user;

    const {
      firstName,
      lastName,
      crewRole,

    } = req.body.editUser;



    await Comander.updateOne(
      { email },
      {
        $set: {
          firstName,
          lastName,
          crewRole,
        }
      }
    );

    res.status(200).json({ response: 'success' });
  } catch (e) {
    res.status(400).json({ response: "fail" });
  }
});



module.exports = router;
