const express = require('express');
const path = require('path');
const parser = require('ua-parser-js');
const request = require('request')


const app = express();
let ipaddress = {};
let language = {};
// app.use(express.static('client'))
request('https://jsonip.com/', (err, res, body) => {
if (!err && res.statusCode === 200) {
    const response = JSON.parse(body)
    //get ip address
    ipaddress = response.ip;
  } else {
    console.log(`error: ${err}, status code: ${res.statusCode}`)
  }
})

app.get('/api/whoami', (req, res) => {
	 var ua = parser(req.headers['user-agent']);
	 //get software
	 const software = `${ua.os.name} ${ua.os.version}`;
	
	//get language
	language = JSON.stringify(req.headers["accept-language"])
	.replace(/['"]+/g, '')
	.split(',')
	.shift();

	res.json({ipaddress: ipaddress, language: language, software: software});
});


app.listen(3000, () =>{
	console.log('app running on 3000')
});