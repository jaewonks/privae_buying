import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/orders', (req, res) => {
  const request = require("request");
  const mallid = 'londonlabel';
  const access_token = 'tF21yYLfWK1QvWGb5bvUZH';
  const version = '2021-06-01'

  const options = { 
    method: 'GET',
    url: `https://${mallid}.cafe24api.com/api/v2/admin/orders?start_date=2021-06-01&end_date=2021-07-14&embed=receivers,items`,
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': "application/json",
      'X-Cafe24-Api-Version': version,
    }
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    //console.log(body);
    res.send(body);
  });
})

app.listen(config.PORT, () => {
  console.log(`serve at http://localhost:${config.PORT}`)
});

