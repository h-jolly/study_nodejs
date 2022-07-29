const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('contacts URL');
});

router.get('/list', (req, res) => {
  res.send('contacts list URL');
});

module.exports = router;
