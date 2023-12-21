const express = require("express");
const router = express.Router();
const conn = require('../mariadb');

router.use(express.json());

// 채널 생성 POST /channel
router
  .route('/')
  .post((req, res) => {
    const {name, user_id} = req.body;
    sql = `INSERT INTO channels VALUES(?, ?)`;
    let values = [name, user_id];

    if (name && user_id) {
      conn.query(sql, values,
        function(err, results) {
          res.status(201).json({
            message : `${name}님 응원합니다.`
          });   
        }
      )
    } else {
      res.status(404).json({
        message : '암것도 없음요'
      });
    }
  })
  // 채널 전체 조회 GET /channel
  .get((req, res) => {
    let sql = `SELECT * FROM channels`;

    conn.query(sql,
      function(err, results) {
        res.status(200).json(results);
      }
    );
  })
  

// /chanell/:id 인 것들 route
router
  .route('/:id')
  // 채널 개별 조회 GET /channel/:id
  .get((req, res) => {
    const {user_id} = req.body;
    let sql = `SELECT * FROM channels WHERE user_id = ?`;
    let values = user_id;
    
    if (user_id) {
      conn.query(sql, values,
        function(err, results) {
          if (results) {
            res.status(200).json(results);
          } else {
            res.status(404).json({
              message: '없음요'
            });
          }
        }
      );
    } else {
      res.status(400).end();
    }
  })
  // 채널 수정 PUT /channel/:id
  .put((req, res) => {
    let sql = `UPDATE channels SET ()`

    conn.query(sql, values,
      function(err, results) {
        if (results) {

        } else {
          res.status(404).json({
            message: '없음요'
          });
        }
      }  
    )
  })
  // 채널 삭제 DELETE /channel/:id
  .delete((req, res) => {
    let {user_id} = req.body;
    let sql = `DELETE FROM channels WHERE user_id = ?`;
    let values = user_id;

    conn.query(sql, values,
      function(err, results) {
        if(results) {
          res.status(200).json(results);
        } else {
          res.status(404).json({
            message: '없음요'
          });
        }
      }  
    )
  });

module.exports = router;