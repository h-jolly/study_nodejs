// 서버와 앱에 대한 관심사 분리
// express 관련된 셋팅만
const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser'); // express 내장 모듈

class App {
  constructor() {
    this.app = express();

    // view 엔진 셋팅
    this.setViewEngine();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 정적 데릭토리 추가
    this.setStatic();

    // 로컬 변수
    this.setLocals();

    // 라우팅
    this.getRouting();

    // 404 페이지
    this.status404();

    // 예외처리
    this.errorHandler();
  }

  setMiddleWare() {
    // 미들웨어 셋팅
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  setViewEngine() {
    nunjucks.configure(
      'template', // 폴더명
      {
        autoescape: true, // 태그 사용 등을 막음, 보안 문제(사용 안함)
        express: this.app,
      }
    );
  }

  setStatic() {
    this.app.use('/uploads', express.static('uploads'));
  }

  setLocals() {
    // Global View 변수
    this.app.use((req, res, next) => {
      this.app.locals.isLogin = true;
      this.app.locals.req_path = req.path;
      next();
    });
  }

  getRouting() {
    // 라우팅
    this.app.use(require('./controllers'));
  }

  status404() {
    // 404 에러
    this.app.use((req, res, _) => {
      // _ 사용하지 않는 변수
      res.status(400).render('common/404.html');
    });
  }

  errorHandler() {
    this.app.use((err, req, res, _) => {
      res.status(500).render('common/500.html');
    });
  }
}

module.exports = new App().app;
