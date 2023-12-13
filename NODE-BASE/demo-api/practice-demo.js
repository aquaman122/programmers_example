const express = require("express");
const app = express();

const db = [];

app.get('/fruits/:id', (req, res) => {
  const fruits = db.find(v => v.id === parseInt(req.params.id));
  
  if (!fruits) return res.status(404).send('없음요');
  res.json(fruits);
});

app.use(express.json());
app.post('/fruits', (req, res) => {
  if (!db) return res.status(404).send('없음요');

  const fruits = {
    id: db.length + 1,
    fruit: req.body.fruit,
    price: req.body.price,
    description: req.body.description
  };
  db.push(fruits);
  res.json(fruits);
});

app.delete('/fruits/:id', (req, res) => {
  const fruits = db.find(v => v.id === parseInt(req.params.id));
  if (!fruits) return res.status(404).send('없음요');

  const idx = db.indexOf(fruits);
  db.splice(idx, 1);
  res.json(fruits);
});

app.put('/fruits/:id', (req, res) => {
  let fruits = db.find(v => v.id === parseInt(req.params.id));
  if (!fruits) res.status(404).send('없음요');

  fruits.fruit = req.body.fruit;
  res.json(fruits);

});

app.listen(9999);
