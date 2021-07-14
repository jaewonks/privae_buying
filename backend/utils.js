const request = require('request');

const mallid = 'londonlabel';
const code = 'w5oJLx4GKBsjmsEjboGwiB';
const redirect_uri = 'https://londonlabel.cafe24.com';

const client_id = '3Y6Yey8eI0rmOmXm3jQv6A';
const client_secret = '257Y7tGIC9lvjt3agIev2A';

const payload = `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`;

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
  console.log(body);
}); 

//https://londonlabel.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id=3Y6Yey8eI0rmOmXm3jQv6A&state=jaewonks&redirect_uri=https://londonlabel.cafe24.com&scope=mall.read_order