import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { db } from '../server.js';

const router = express.Router();

router.post('/info', expressAsyncHandler(async (req,res) => {
  const orderId = req.body.orderId;
  const link = req.body.link;
  const originalprice = req.body.originalprice;
  db.query(
    'INSERT INTO privae_buyinginfo (buyinginfo_orderid,buyinginfo_link,buyinginfo_originalprice) VALUES (?,?,?)',
    [orderId,link,originalprice],
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
    'SELECT * FROM privae_buyinginfo WHERE buyinginfo_orderid = ?', req.params.id,
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