const request = require('request');

const mallid = 'londonlabel';
const code = 'Bj8eIHi0ciDE3jcISzROOH';
const redirect_uri = 'https://londonlabel.cafe24.com';
const refresh_token = 'ZKffSkZqUUvyeXiMTly7NM';

const client_id = '3Y6Yey8eI0rmOmXm3jQv6A';
const client_secret = '257Y7tGIC9lvjt3agIev2A';

const payload = `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`;
//const payload = `grant_type=refresh_token&refresh_token=${refresh_token}`;

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

//https://londonlabel.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id=3Y6Yey8eI0rmOmXm3jQv6A&state=jaewonks&redirect_uri=https://londonlabel.cafe24.com&scope=mall.read_order,mall.read_product

