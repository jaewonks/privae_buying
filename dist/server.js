"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _config = _interopRequireDefault(require("./config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
import mysql from 'mysql';
 
const db = mysql.createConnection({
  host: 'localhost' || '127.0.0.1',
  user: 'root',
  password: config.DB_PW, 
  database: config.DB_NAME
})

db.connect((err) => {
  if (err) throw err;
  console.log('DB connected!');
});
*/
const app = (0, _express.default)();

const request = require("request");

const mallid = 'londonlabel';
const access_token = _config.default.ACCESS_TOKEN;

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month.toString() : month.toString();
  let day = date.getDate();
  day = day < 10 ? '0' + day.toString() : day.toString();
  console.log(year + '-' + month + '-' + day);
  return year + '-' + month + '-' + day;
};

app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use('/api/orders', (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${mallid}.cafe24api.com/api/v2/admin/orders?limit=500&start_date=2021-07-07&end_date=${getCurrentDate()}&embed=receivers,items`,
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': "application/json"
    }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error); //console.log(body);

    res.send(body);
  });
});
app.use('/api/buying/:id', (req, res) => {
  const id = req.params.id;
  const options = {
    method: 'GET',
    url: `https://${mallid}.cafe24api.com/api/v2/admin/products/${id}`,
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': "application/json"
    }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
  });
});
app.listen(_config.default.PORT, () => {
  console.log(`serve at http://localhost:${_config.default.PORT}`);
});