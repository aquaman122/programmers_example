const express = require('express');
const app = express();

let nodejsBook = {
  title: 'Node.js 공부',
  price: 20000,
  description: "이 책 좋음"
}

app.get('/products/1', function (req, res) {
  res.json(nodejsBook);
});

app.listen(1234);