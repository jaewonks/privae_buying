const getToken = () => {
  const request = require('request');
  const mallid = 'londonlabel';
  const refresh_token = 'BwmatO7MOtPrq16sz4e9FC';
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
    res.send(body);
    //return body.access_token;
  }); 
}


