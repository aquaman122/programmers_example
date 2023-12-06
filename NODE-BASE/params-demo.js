const express = require('express');
const app = express();

for (let i =1; i <= 1000; i++) {
  app.get('product/i', function(req, res) {
    res.json({
      num : i
    })
  })  
}

app.listen()