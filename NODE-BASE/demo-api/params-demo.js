const express = require('express');
const app = express();

// app.get('/products/:n', function(req, res) {
//   res.json({
//     num: parseInt(req.params.n)
//   });
// });  

// 채널 주소 : 
let youtuber1 = {
  channelTitle : "maetv",
  sub : "11.3만명",
  videoNum : "1.7천개"
}

let youtuber2 = {
  channelTitle : "UCl23-Cci_SMqyGXE1T_LYUg",
  sub : "170만명",
  videoNum : "498개"
}

let youtuber3 = {
  channelTitle : "dream-coding",
  sub : "17.2만명",
  videoNum : "142개"
}

let youtubers = [];
youtubers.push(youtuber1,youtuber2,youtuber3);
// let db = new Map();
// db.set(
//   {
//   channelTitle : "maetv",
//   sub : "11.3만명",
//   videoNum : "1.7천개"
//   },
//   {
//     channelTitle : "UCl23-Cci_SMqyGXE1T_LYUg",
//     sub : "170만명",
//     videoNum : "498개"
//   },
//   {
//     channelTitle : "dream-coding",
//     sub : "17.2만명",
//     videoNum : "142개"
//   }
//   );

app.get('/:nickname', function(req, res) {
  const {nickname} = req.params;
  
  // youtubers.forEach((youtuber) => {
  //   if (youtuber.channelTitle === nickname) {
  //     res.json(youtuber);
  //   }
  // });
  const foundYoutuber = youtubers.find(youtuber => youtuber.channelTitle === nickname);

  if (foundYoutuber) {
    res.json(foundYoutuber)
  } else {
    res.json({
      message : "error page"
    })
  }
});  

// 영상 채널 주소 :
// app.get('/watch', function(req, res) {
//   const q = req.query

//   res.json({
//     video : q.v
//   });
// });  

app.listen(1234);