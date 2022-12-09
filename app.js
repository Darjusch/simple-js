const http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var url = require('url');
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

app.post('/write', function (req, res) {
  fs.writeFile('creds.txt', req.body, { flag: 'a+' }, (err) => {
    if (err) {
      console.error(err);
      res.send(err);
    }
  });
  res.send('Success!');
});
app.get('/read', function (req, res) {
  fs.readFile('creds.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    console.log(data);
    res.send(data);
  });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
