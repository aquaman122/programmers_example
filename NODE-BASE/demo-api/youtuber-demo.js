const { json } = require('express');
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

let id = 1;
youtubers.forEach((item, idx) => {
  db.set(id++, item);
})

app.get('/youtubers', function (req, res) {
  let youtubers = {}
  db.forEach((value, key) => {youtubers[key] = value});
  res.json(youtubers);
});

app.get('/youtubers/:id', function(req, res) {
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

app.use(express.json()); // 미들웨어 모듈
app.post('/youtubers', function (req, res) {
  db.set(id++, req.body);

  res.json({
    message : `${db.get(id-1).channelTitle}님 유튜버 생활을 응원합니다.`
  });
  console.log(req.body);
  
});

app.listen(1234);