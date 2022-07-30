// 현재 express 관련된 셋팅이 전부 한곳에 있음..
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

// Global View 변수
app.use((req, res, next) => {
  app.locals.isLogin = false;
  app.locals.req_path = req.path;
  next();
});

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

// 에러
app.use((req, res, _) => {
  res.status(400).render('common/404.html');
  // _ 사용하지 않는 변수
});
app.use((req, res, _) => {
  res.status(500).render('common/500.html');
  // _ 사용하지 않는 변수
});

app.listen(port, () => {
  console.log('Express listening on port', port);
});
