const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser'); // express 내장 모듈

const admin = require('./routes/admin');
const contacts = require('./routes/contacts');

const app = express();
const port = 3000;

nunjucks.configure('template', {
  // 폴더명
  autoescape: true, // 태그 사용 등을 막음, 보안 문제(사용 안함)
  express: app,
});

// 미들웨어 셋팅
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/// 정적 파일
app.use('/uploads', express.static('uploads'));

// 라우팅
app.get('/', (req, res) => {
  res.send('hello express');
});

function vipMiddleware(req, res, next) {
  console.log('최우선 미들웨어');
  next();
}

// 라우팅
app.use('/admin', vipMiddleware, admin);
app.use('/contacts', contacts);

app.listen(port, () => {
  console.log('Express listening on port', port);
});
