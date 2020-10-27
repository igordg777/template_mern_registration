// const express = require('express');
// const router = express.Router();

// const Flights = require('../models/flights');
// const Airports = require('../models/airports');

// router.post('/api/getAllFly', async (req, res) => {

//   try {
//     const flights = await Flights.find();
//     return res.status(200).json({ response: flights });
//   } catch (e) {
//     res.status(400).json({ response: 'fail' });
//   }
// });

// router.post('/api/getAirports/russia', async (req, res) => {

//   try {
//     const airports = await Airports.find({ 'countryName': "Российская Федерация" });

//     return res.status(200).json({ response: airports });
//   } catch (e) {
//     res.status(400).json({ response: 'fail' });
//   }
// });

// router.post('/api/getAirports/world', async (req, res) => {

//   try {
//     const airports = await Airports.find();
//     let worldAirports = [];
//     for (let i = 0; i < airports.length; i++) {
//       if (airports[i].countryName === "Российская Федерация") {
//         continue
//       } else {
//         worldAirports.push(airports[i])
//       }
//     }

//     return res.status(200).json({ response: worldAirports });
//   } catch (e) {
//     res.status(400).json({ response: 'fail' });
//   }
// });

// router.post('/api/getCities', async (req, res) => {
//   try {
//     let cities;
//     const getCities = await Airports.find({}, function (err, docs) {
//       const doc = docs.map(el => {
//         return el.cityName;
//       })

//       cities = [...new Set(doc)].sort();
//     });
//     return res.status(200).json({ response: cities });
//   } catch (e) {
//     res.status(400).json({ response: 'fail' });
//   }
// });

// module.exports = router;

