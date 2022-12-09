var express = require('express');
var app = express();
var fs = require('fs');
const bp = require('body-parser');
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
const port = 3000;

app.get('/', function (req, res) {
  fs.readFile('creds.txt', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else {
      console.log('Success!');
      console.log(data);
      res.send(data);
    }
  });
});

app.post('/write', function (req, res) {
  console.log(JSON.stringify(req.body));
  var appendData = JSON.stringify(req.body) + '\n';
  fs.appendFile('creds.txt', appendData, { flag: 'a+' }, (err) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else {
      console.log('Success!');
    }
  });
  res.send('Success!');
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
