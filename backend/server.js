import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config.js';
import data from './data.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get('/api/orders', (req, res) => {
  const orders = data.orderDatas;
  if(orders) {
    res.send(orders);
  } else {
    res.status(404).send({ message: 'Orders Not Found' });
  }
});
app.listen(config.PORT, () => {
  console.log(`serve at http://localhost:${config.PORT}`)
});