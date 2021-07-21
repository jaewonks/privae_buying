import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config.js';
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

const app = express();
const request = require("request");
const mallid = 'londonlabel';
const access_token = 'DLZPfpSmEqUJ75nKZSiSZG';
const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month.toString() : month.toString();
  let day = date.getDate();
  day = day < 10 ? '0' + day.toString() : day.toString();
  console.log(year+'-'+month+'-'+day)
  return year+'-'+month+'-'+day;
} 

app.use(cors());
app.use(bodyParser.json());
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
    if (error) throw new Error(error);
    //console.log(body);
    res.send(body);
  });
})

app.use('/api/buying/:id', (req, res) => {
  //console.log(req.params.id)
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
})

app.listen(config.PORT, () => {
  console.log(`serve at http://localhost:${config.PORT}`)
});

