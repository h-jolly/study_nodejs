const express = require('express');
const nunjucks = require('nunjucks');

const admin = require('./routes/admin');
const contacts = require('./routes/contacts');

const app = express();
const port = 3000;

nunjucks.configure('template', {
  // 폴더명
  autoescape: true, // 태그 사용 등을 막음, 보안 문제(사용 안함)
  express: app,
});

app.get('/', (req, res) => {
  res.send('hello express');
});

// 라우팅
app.use('/admin', admin);
app.use('/contacts', contacts);

app.listen(port, () => {
  console.log('Express listening on port', port);
});
