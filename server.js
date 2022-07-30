// 서버와 앱에 대한 관심사 분리
// 서버를 띄우는 것만
const app = require('./app');
const port = 3000;

app.listen(port, () => {
  console.log('Express listening on port', port);
});
