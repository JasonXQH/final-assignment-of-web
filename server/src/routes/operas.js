const express = require("express");
const router = express.Router();
const {
  findAll,
  insertMany,
  getListByKey,
  getListByOr,
  create,
  delete: del,
} = require("../controllers/operas");

// 一次性插入多条数据，为了使用postMan插入多条数据
router.post("/add", insertMany);
router.get("/list", findAll);
router.get("/getlist", getListByKey);
router.get("/getListOr", getListByOr);
router.post("/create", create);
router.post("/:id/delete", del);
module.exports = router;
