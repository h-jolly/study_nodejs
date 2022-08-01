const express = require('express');
const { render } = require('nunjucks');
const router = express.Router();

// 미들
function testMiddleware(req, res, next) {
  console.log('첫번째 미들웨어');
  next();
}

function testMiddleware2(req, res, next) {
  console.log('두번째 미들웨어');
  next();
}

router.get('/', testMiddleware, testMiddleware2, (req, res) => {
  res.send('admin 이후 url');
});

router.get('/products', (req, res) => {
  // res.send('admin products');
  res.render('admin/products.html', {
    message: 'hello!!!!222',
    online: 'express',
  });
});

router.get('/products/write', (req, res) => {
  res.render('admin/write.html');
});

router.post('/products/write', (req, res) => {
  res.send(req.body);
});

module.exports = router;
