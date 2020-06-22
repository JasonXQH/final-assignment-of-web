const express = require('express');
const router = express.Router();
const { findAll,getAll, insertMany, delete: del, getListByKey, getListByOr } = require('../controllers/douban');

// 一次性插入多条数据，为了使用postMan插入多条数据
router.post('/add', insertMany);
router.post('/delete/:id', del);
router.get('/list', findAll);
router.get('/getlist', getListByKey)
router.get('/getListOr', getListByOr)
router.get('/getAll', getAll)
module.exports = router;
