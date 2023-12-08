const express = require('express');
const app = express();

let db = new Map();

let data = [{
  productName : 'notebook',
  price : 200000
},
{
  productName : 'cup',
  price : 3000
},
{
  productName : 'chair',
  price : 50000
},
{
  productName : 'backpack',
  price : 100000
}]

data.forEach((item, idx) => {
  db.set(idx, item);
})

app.get('/:id', function (req, res) {
  let {id} = req.params;
  id = parseInt(id);

  if (db.get(id) === undefined) {
    res.json({
      message: '없는 상품입니다.'
    });
  } else {
    res.json({
      id : id,
      productName : db.get(id)
    })
  }
});

app.listen(1234);