const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://igorg:ibmix4@cluster0.aev79.azure.mongodb.net/IBMiX4?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

const Schema = mongoose.Schema;

const pilot = Schema({
  firstName: { type: String },
  lastName: { type: String },
  patronymic: { type: String },
  email: { type: String },
  crewRole: { type: String },
  standingFromDate: { type: String },
  standingFromDateInRole: { type: String },
  reliabilityIndex: { type: String },
  rewardsAndPunishments: { type: String },
  phone: { type: String },
  password: { type: String },
  keyForNewPassword: { type: String },
  wishForm: { type: Array },
  arrWish: { type: Array },
  arrFlights: { type: Array },
});



const Pilot = mongoose.model('Pilot', pilot);


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

async function foo() {
  const pilotCollection = await Pilot.find()
  const arrFlights = [
    {
      "where_to": "Париж",
      "where_from": "Москва",
      "flight_time": 4.30,
      "time_of_departure": "2020-09-21",
      "time_of_arrival": "2020-09-21",
      "level_flights": 7,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Шарль де Голль"
    },
    {
      "where_to": "Хабаровск",
      "where_from": "Москва",
      "flight_time": 10.21,
      "time_of_departure": "2020-09-23",
      "time_of_arrival": "2020-09-24",
      "level_flights": 7,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Новый"
    },
    {
      "where_to": "Санкт-Петербург",
      "where_from": "Москва",
      "flight_time": 1.50,
      "time_of_departure": "2020-09-25",
      "time_of_arrival": "2020-09-25",
      "level_flights": 4,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Пулково"
    },
    {
      "where_to": "Лондон",
      "where_from": "Москва",
      "flight_time": 5.15,
      "time_of_departure": "2020-09-27",
      "time_of_arrival": "2020-09-27",
      "level_flights": 6,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Heathrow"
    },
    {
      "where_to": "Чита",
      "where_from": "Москва",
      "flight_time": 6.15,
      "time_of_departure": "2020-09-29",
      "time_of_arrival": "2021-09-30",
      "level_flights": 5,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Кадала"
    },
    {
      "where_to": "Новосибирск",
      "where_from": "Москва",
      "flight_time": 5.55,
      "time_of_departure": "2020-10-01",
      "time_of_arrival": "2021-10-01",
      "level_flights": 3,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Толмачёво"
    },
    {
      "where_to": "Рио-де-Жанейро",
      "where_from": "Москва",
      "flight_time": 15,
      "time_of_departure": "2020-10-05",
      "time_of_arrival": "2021-10-06",
      "level_flights": 8,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Галеан"
    },
    {
      "where_to": "Братислава",
      "where_from": "Москва",
      "flight_time": 2.45,
      "time_of_departure": "2020-10-08",
      "time_of_arrival": "2021-10-08",
      "level_flights": 4,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Bratislava-Ivanka"
    },
    {
      "where_to": "Прага",
      "where_from": "Москва",
      "flight_time": 3.30,
      "time_of_departure": "2020-10-10",
      "time_of_arrival": "2020-10-10",
      "level_flights": 6,
      "city_photo": "http://placeimg.com/640/480/city",
      "airport_name": "Вацлава Гавела"
    }
  ]
  // const pilotCollection = await Pilot.findOne({ email: 'igordg30.07.19861@gmail.com' });

  for (let j = 0; j < pilotCollection.length; j++) {


    pilotCollection[j].arrFlights = arrFlights
    await pilotCollection[j].save();
  }
}

// foo()
