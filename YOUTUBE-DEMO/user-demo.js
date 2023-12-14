const express = require("express");
const app = express();

app.listen(7777);

const db = [];

// 로그인
app.use(express.json());
app.post('/login', (req, res) => {
  const emailPwd = db.find(v => v.email === req.body.email && v.pwd === req.body.pwd);

  if (emailPwd) {
    res.send(`${email.username}님 하이요`);
    hasUserId = true;
  } else {
    res.send('email 혹은 password가 틀림요');
  }
});

// 회원 가입
app.post('/join', (req, res) => {
  if(req.body.email === undefined) return res.status(404).send('유저 없음요');
  const users = {
    id: db.length + 1,
    email: req.body.email,
    pwd: req.body.pwd,
    username: req.body.username
  };

  db.push(users);
  res.status(201).json({
    message: `${users.username}님 하이요`
  })
});

app
  .route('/users/:id')
  // 회원 개별 조회
  .get((req, res) => {
    const users = db.find(v => v.id === parseInt(req.params.id));
  
    if (!users) {
      res.send('없음요');
    } else {
      res.json({
        email: users.email,
        username: users.username
      });
    }
  })
  // 회원 개별 탈퇴
  .delete((req, res) => {
    const users = db.find(v => v.id === parseInt(req.params.id));
  
    const idx = db.indexOf(users);
    db.splice(idx, 1);
    res.json(users);
  })



