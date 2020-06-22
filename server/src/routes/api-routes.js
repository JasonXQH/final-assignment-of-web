const express = require('express');
const userRoutes = require('./user-routers');
const maoyanRoutes = require('./maoyan');
const doubanRoutes = require('./douban');
const operasRoutes = require('./operas');
const taobaoRoutes = require('./taobao');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/maoyan', maoyanRoutes);
router.use('/douban', doubanRoutes);
router.use('/operas', operasRoutes);
router.use('/taobao', taobaoRoutes);

module.exports = router;
