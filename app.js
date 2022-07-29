const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/jolly', (req, res) => {
  res.send('jolly');
});

app.listen(port, () => {
  console.log('Express listening on port', port);
});
