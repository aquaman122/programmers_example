let jwt = require('jsonwebtoken');
let dotenv = require('dotenv');

dotenv.config();

let token = jwt.sign({foo : 'bar'}, process.env.PRIVITE_KEY);
// token 생성 = jwt 서명을 했다. (페이로드, 나만의 암호키) + SHA256

// 검증
console.log(token);
// 만약 검증에 성공하면, 페이로드 값을 확인할 수 있음!

let decoded = jwt.verify(token, process.env.PRIVITE_KEY);
console.log(decoded) // bar