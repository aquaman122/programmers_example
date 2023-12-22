const express = require("express");
const connection = require("../mariadb");
const {body, param, validationResult} = require('express-validator');
const router = express.Router();

const conn = require('../mariadb');

router.use(express.json());

const isValidate = (req, res, next) => {
  const err = validationResult(req);

  if (err.isEmpty()) {
    return next();
  } else {
    return res.status(400).json(err.array());
  }
}

function notFoundChannel(res) {
  return res.status(404).json({
    message: "없음요"
  });
}

// 로그인
router.post(
  '/login',
  [
    body('email').notEmpty().isString().withMessage('문자 입력해'),
    body('password').notEmpty().isString().withMessage('문자 입력해'),
    isValidate
  ]
  ,(req, res) => {
  const {email, password} = req.body;
  const values = [email, password];
  let sql = `SELECT * FROM users WHERE email = ?`;
  
  conn.query(sql, values,
    function(err, results) {
      if (err) {
        return res.status(400).json(err.array());
      }

      if (results[0]?.password === password) {
        res.status(200).json({
          message: `${results[0].name}님 하이요`
        });
      } else {
        res.status(404).send('아이디나 비밀번호가 틀림요');
      }
    }
  );
});

// 회원 가입
router.post('/join',
  [
    body('email').notEmpty().isString().withMessage('문자 입력해'),
    body('name').notEmpty().isString().withMessage('문자 입력해'),
    body('password').notEmpty().isString().withMessage('문자 입력해'),
    isValidate
  ],
  (req, res) => {
    const {email, name, password, contact} = req.body;
    let sql = `INSERT INTO users (email, name, password, contact)
    VALUES (?, ?, ?, ?)`;
    let values = [email, name, password, contact];
    
    
    conn.query(sql, values,
      function(err, results) {
        if (err) {
          return res.status(400).json(err.array());
        }
        res.status(200).json(results);
      }
    );
});

router
  .route('/users/:id')
  // 회원 개별 조회
  .get(
    [
      body('email').notEmpty().isString().withMessage('문자 입력'),
      isValidate
    ],
    (req, res) => {
    let {email} = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;
    let values = email;
    conn.query(sql, values,
      function(err, results) {
        if (err) {
          return res.status(400).json(err.array());
        }
        res.status(200).json(results);
      }
    );
  })
  // 회원 개별 탈퇴
  .delete(
    [
      body('email').notEmpty().isString().withMessage('문자 입력'),
      isValidate
    ],
    (req, res) => {
    let {email} = req.body;

    let sql = `DELETE FROM users WHERE email = ?`;
    let values = email
    conn.query(sql, values,
      function(err, results) {
        if (err) {
          return res.status(400).json(err.array());
        }
        res.status(200).json(results);
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