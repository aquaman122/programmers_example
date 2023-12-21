const { application } = require("express");
const express = require("express");
const connection = require("../mariadb");
const router = express.Router();

const conn = require('../mariadb');

router.use(express.json());

// 로그인
router.post('/login', (req, res) => {
  const {email, password} = req.body;

  let sql = `SELECT * FROM users WHERE email = ?`;
  let values = email
  conn.query(sql, values,
    function(err, results) {
      let loginUser = results[0];
      if (loginUser) {
        if (loginUser.password === password) {
          res.status(200).json({
            message: `${loginUser.name}님 하이요`
          });
        } else {
          res.status(404).send('아이디나 비밀번호가 틀림요');
         }
     }  else {
      res.status(404).send('없음요');
     }
    }
  );
});

// 회원 가입
router.post('/join', (req, res) => {
  const {email, name, password, contact} = req.body;
  let sql = `INSERT INTO users (email, name, password, contact)
  VALUES (?, ?, ?, ?)`;
  let values = [email, name, password, contact];

  if (req.body === {}) {
    res.status(400).json({
      message : `입력 값을 다시 적어라.`
    });
  } else {
    conn.query(sql, values,
      function(err, results) {
        res.status(200).json(results);
      }
    );
  }
  res.status(201).json({
    message: `${name}님 하이요`
  })
});

router
  .route('/users/:id')
  // 회원 개별 조회
  .get((req, res) => {
    let {email} = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;
    let values = email;
    conn.query(sql, values,
      function(err, results) {
        if (results) {
          res.status(200).json(results);
        } else {
          res.status(400).send('없음요');
        }
      }
    );
  })
  // 회원 개별 탈퇴
  .delete((req, res) => {
    let {email} = req.body;

    let sql = `DELETE FROM users WHERE email = ?`;
    let values = email
    conn.query(sql, values,
      function(err, results) {
        if (results) {
          res.status(200).json(results);
        } else {
          res.status(400).send('없음요');
        }
      }
    );
  })

  router
  .get('/users/', (req, res) => {
    let sql = `SELECT * FROM users`;
    conn.query(sql,
      function(err, results) {
        if (results) {
          res.status(200).json(results);
        } else {
          res.status(400).send('없음요');
        }
      }
    );
  })

module.exports = router;