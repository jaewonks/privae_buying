import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { db } from '../server.js';

const router = express.Router();

router.post('/info', expressAsyncHandler(async (req,res) => {
  const orderId = req.body.orderId;
  const place = req.body.place;
  const detail = req.body.detail;
  const price = req.body.price;
  const date = req.body.date;

  db.query(
    'INSERT INTO privae_orderinfo (orderinfo_orderid,orderinfo_place,orderinfo_detail,orderinfo_price,orderinfo_date) VALUES (?,?,?,?,?)',
    [orderId,place,detail,price,date],
    (err, result) => {
      if (err) {
        console.log({ error: err });
      }
      if (result) {
        res.send(result)
      } else {
        res.send({ message: 'Fail to save buying info' });
      }
    }
  )
}));

router.get('/info/:id', expressAsyncHandler(async (req,res) => {
  db.query(
    'SELECT * FROM privae_orderinfo WHERE orderinfo_orderid = ?', req.params.id,
    (err, result) => {
      if (err) {
        console.log({ error: err });
      }
      if (result) {
        res.send(result)
      } else {
        res.send({ message: 'Fail to find buying info' });
      }
    }
  )
}));

export default router