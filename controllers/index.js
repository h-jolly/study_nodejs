// 라우팅에 대한 모든 폴더와 대메뉴 URL
const { Router } = require('express');
const router = Router();

router.use('/admin', require('./admin'));
// router.use('/contacts', require('./contacts'));

module.exports = router;
