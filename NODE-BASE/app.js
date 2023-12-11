const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});


app.use(express.json());
app.post('/test', function(req, res) {
  res.json({
    message : req.body.message
  })
});

app.listen(1234);