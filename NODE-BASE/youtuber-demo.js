const express = require('express');
const app = express();

let db = new Map();

let youtubers = [
  {
  channelTitle : "maetv",
  sub : "11.3만명",
  videoNum : "1.7천개"
  },
  {
    channelTitle : "UCl23-Cci_SMqyGXE1T_LYUg",
    sub : "170만명",
    videoNum : "498개"
  },
  {
    channelTitle : "dream-coding",
    sub : "17.2만명",
    videoNum : "142개"
  }
];
youtubers.forEach((item, idx) => {
  db.set(idx+1, item);
})


app.get('/youtuber/:id', function(req, res) {
  let {id} = req.params;
  id = parseInt(id);

  let youtuber = db.get(id);
  if (db.get(id) === undefined) {
    res.json({
      message : "유튜버 정보를 찾을 수 없습니다."
    })
  } else {
    res.json(youtuber);
  }
});

app.listen(1234);