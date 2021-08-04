import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config.js';
import buyingRouter from './routers/buyingRouter.js';
import orderRouter from './routers/orderRouter.js';
import mysql from 'mysql';
 
export const db = mysql.createConnection({
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
let access_token;
let refresh_token = 'X2rwNyMQHpQvC3IzAdkClB';

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month.toString() : month.toString();
  let day = date.getDate();
  day = day < 10 ? '0' + day.toString() : day.toString();
  return year+'-'+month+'-'+day;
} 

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth/token', (req, res) => {
  //const payload = `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`;
  const payload = `grant_type=refresh_token&refresh_token=${refresh_token}`;
  const options = {
    method: 'POST',
    url: `https://${mallid}.cafe24api.com/api/v2/oauth/token`,
    headers: {
      'Authorization': `Basic M1k2WWV5OGVJMHJtT21YbTNqUXY2QToyNTdZN3RHSUM5bHZqdDNhZ0lldjJB`,
      'Content-Type': "application/x-www-form-urlencoded"
    },
    body: payload,
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const token = {
      access_token: body.access_token,
      refresh_token: body.refresh_token
    }

    console.log(token)
    res.send(body);
  }); 
})

app.use('/api/refresh_token', (req, res) => {
  const refreshToken = req.body.refresh_token;
  console.log('refreshToken',refreshToken);
  const payload = `grant_type=refresh_token&refresh_token=${refreshToken}`;
  const options = {
    method: 'POST',
    url: `https://${mallid}.cafe24api.com/api/v2/oauth/token`,
    headers: {
      'Authorization': `Basic M1k2WWV5OGVJMHJtT21YbTNqUXY2QToyNTdZN3RHSUM5bHZqdDNhZ0lldjJB`,
      'Content-Type': "application/x-www-form-urlencoded"
    },
    body: payload,
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    access_token = body.access_token;
    refresh_token = body.refresh_token;
    console.log(access_token, refresh_token);
    app.use((req, res) => {
      res.header('Authorization', 'Bearer '+access_token);
    })
    res.send(body);
  }); 
})

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
    res.send(body);
  });
})

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
})

app.use('/api/buyings', buyingRouter);
app.use('/api/orderings', orderRouter);

app.listen(config.PORT, () => {
  console.log(`serve at http://localhost:${config.PORT}`)
});

