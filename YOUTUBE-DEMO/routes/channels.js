const express = require("express");
const router = express.Router();
const conn = require('../mariadb');
const {body, param, validationResult} = require('express-validator');

router.use(express.json());

//미들웨어 모듈화
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
    message: '없음요'
  });
}

router
  .route('/')
  // 채널 전체 조회 GET /channel
  .get( 
    [      
      body('user_id').notEmpty().isInt().withMessage('숫자 입력 필요'),
      isValidate
    ]
    ,(req, res, next) => {
      let {user_id} = req.body;
      let sql = `SELECT * FROM channels WHERE user_id = ?`;
      conn.query(sql, user_id,
        function(err, results) {
          if (err) {
            return res.status(400).end();
          }

          if(results.length) {
            res.status(200).json(results);
          } else {
            notFoundChannel(res);
          }
        }
      );
  })
  // 채널 생성 POST /channel
  .post(
    // 유효성 검사 if 대용 express-validator
    [
      body('user_id').notEmpty().isInt().withMessage('숫자 입력해'),
      body('name').notEmpty().isString().withMessage('문자 입력해'),
      isValidate
    ]
    , (req, res) => {
      const {name, user_id} = req.body;
      let sql = `INSERT INTO channels (name, user_id)
      VALUES(?, ?)`;
      let values = [name, user_id];
    
      conn.query(sql, values,
        function(err, results) {
          if (err) {
            return res.status(400).end();
          }
          res.status(201).json(results);
        }
      )
  })
  

// /chanell/:id 인 것들 route
router
  .route('/:id')
  // 채널 개별 조회 GET /channel/:id
  .get(
    [
      param('id').notEmpty().withMessage('채널id 필요'),
      isValidate
    ],
    (req, res) => {
      let {id} = req.params;
      id = parseInt(id);
      let sql = `SELECT * FROM channels WHERE id = ?`;
      
      conn.query(sql, id,
        function(err, results) {
          if (err) {
            console.log(err);
            return res.status(400).send("err");
          }

          if (results.length) {
            res.status(200).json(results);
          } else {
            notFoundChannel(res);
          }
        }
      );
  })
  // 채널 수정 PUT /channel/:id
  .put(
    [
      param('id').notEmpty().withMessage('채널id 필요'),
      body('name').notEmpty().isString().withMessage('채널명 오류'),
      isValidate
    ],
    (req, res) => {
      let {id} = req.params;
      id = parseInt(id);
      let {name} = req.body;

      let sql = `UPDATE channels SET name = ?
                  WHERE id = ?`;
      let values = [name, id];
      conn.query(sql, values,
        function(err, results) {
          if (err) {
            return res.status(400).send("머지");
          }

          if (results.affectedRows === 0) {
            return res.status(400).send("모린다..");
          } else {
            res.status(200).json(results);
          }
          
        }
      );
  })
  // 채널 삭제 DELETE /channel/:id
  .delete(
    [
      param('id').notEmpty().withMessage('채널id 필요'),
      isValidate
    ],
    (req, res) => {
      let {id} = req.params;
      id = parseInt(id);

      let sql = `DELETE FROM channels WHERE id = ?`;

      conn.query(sql, id,
        function(err, results) {
          if(err) {
            return res.status(400).end();
          }

          res.status(200).json(results);
        }  
      )
  });

module.exports = router;