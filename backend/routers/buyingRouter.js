import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { db } from '../server.js';

const router = express.Router();

router.post('/info', expressAsyncHandler(async (req,res) => {
  const orderId = req.body.orderId;
  const link = req.body.link;
  const originalprice = req.body.originalprice;
  db.query(
    'INSERT INTO privae_buyingifo (buying_orderId,buyinginfo_link,buyinginfo_originalprice) VALUES (?,?,?)',
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

router.post('/info/:id', expressAsyncHandler(async (req,res) => {
  db.query(
    'INSERT INTO privae_buying WHERE buying_orderId = ?', req.params.id,
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