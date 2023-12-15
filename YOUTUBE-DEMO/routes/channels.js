const express = require("express");
const router = express.Router();

router.use(express.json());

const db = [];
// 채널 생성 POST /channel
router
  .route('/')
  .post((req, res) => {
    
    let channel = {
      id: db.length + 1,
      channelTitle: req.body.channelTitle
    };
    
    if (req.body.channelTitle === undefined) {
      res.status(404).json({
        message : '암것도 없음요'
      });
    } else {
      db.push(channel);
      res.status(201).json({
        message : `${req.body.channelTitle}님 응원합니다.`
      });
    }
  })
  // 채널 전체 조회 GET /channel
  .router.get((req, res) => {
    res.status(200).json(db);
  })
  

// /chanell/:id 인 것들 route
router
  .route('/:id')
  // 채널 개별 조회 GET /channel/:id
  .get((req, res) => {
    const channel = db.find(v => v.id === parseInt(req.params.id));

    if (channel) {
      res.status(200).json(channel);
    } else {
      res.status(404).json({
        message: '없음요'
      })
    }
  })
  // 채널 수정 PUT /channel/:id
  .put((req, res) => {
    let channel = db.find(v => v.id === parseInt(req.params.id));

    if (channel) {
      channel.channelTitle = req.body.channelTitle;
      res.status(200).json(channel);
    } else {
      res.status(404).json({
        message: '없음요'
      });
    }
  })
  // 채널 삭제 DELETE /channel/:id
  .delete((req, res) => {
    let channel = db.find(v => v.id === parseInt(req.params.id));

    if (channel) {
      res.status(200).send(`${channel.channelTitle}삭제했음요`);

      const idx = db.indexOf(channel);
      db.splice(idx, 1);
    } else {
      res.status(404).json({
        message: '없음요'
      });
    }
  })

module.exports = router;