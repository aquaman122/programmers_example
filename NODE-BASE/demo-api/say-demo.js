let express = require('express');
let app = express();

app.get('/hello', function (req, res) {
  res.json({
    say: 'Hi'
  });
});

app.get('/bye', function (req, res) {
  res.json({
    say: 'Bye'
  });
});

app.get('/nicetomeetyou', function (req, res) {
  res.send('nicetomeetyou');
});