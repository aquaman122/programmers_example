const express = require("express");
const router = express.Router();

router.use(express.json());

const db = [];

// 로그인
router.post('/login', (req, res) => {
  const userIdPwd = db.find(v => v.userId === req.body.userId && v.pwd === req.body.pwd);
  

  if (userIdPwd) {
    res.send(`${userId.username}님 하이요`);
    hasUserId = true;
  } else {
    res.send('userId 혹은 password가 틀림요');
  }
});

// 회원 가입
router.post('/join', (req, res) => {
  if(req.body.userId === undefined) return res.status(404).send('유저 없음요');
  const users = {
    id: db.length + 1,
    userId: req.body.userId,
    pwd: req.body.pwd,
    username: req.body.username
  };

  db.push(users);
  res.status(201).json({
    message: `${users.username}님 하이요`
  })
});

router
  .route('/users/:id')
  // 회원 개별 조회
  .get((req, res) => {
    const users = db.find(v => v.id === parseInt(req.params.id));
  
    if (!users) {
      res.send('없음요');
    } else {
      res.json({
        userId: users.userId,
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

module.exports = router;