const jsonwebtoken = require("jsonwebtoken");
const MaoYan = require("../models/maoyantop");
const { scrects } = require("../../config");
class MaoyantopCtl {
  async findAll(req, res) {
    const { per_page = 10 } = req.query;
    const page = Math.max(req.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const total = await MaoYan.countDocuments();
    const sort = req.query.sort;
    console.log(sort);
    if (sort === "undefined") {
      const data = await MaoYan.find()
        .limit(perPage)
        .skip(page * perPage);
      res.status(201).json({ data, total });
    } else {
      const data = await MaoYan.find()
        .sort({ score: sort === "reverse" ? 1 : -1 })
        .limit(perPage)
        .skip(page * perPage);
      res.status(201).json({ data, total });
    }
  }
  async insertMany(req, res) {
    const { data } = req.body;
    await MaoYan.insertMany(data);
    res.status(201).json({ data: "success" });
  }
  async getListByKey(req, res) {
    const params = {};
    Object.keys(req.query).forEach((item) => {
      params[item] = { $regex: eval(`/${req.query[item]}/ig`) };
    });
    console.log(params);

    const data = await MaoYan.find(params);
    res.status(201).json({ data });
  }
  async getListByOr(req, res) {
    const params = {};
    Object.keys(req.query).forEach((item) => {
      params[item] = { $regex: eval(`/${req.query[item]}/ig`) };
    });

    const params2 = [];
    Object.keys(params).forEach((item) => {
      const obj = {};
      obj[item] = params[item];
      params2.push(obj);
    });
    console.log(params, params2);
    const data = await MaoYan.find({ $or: params2 });
    res.status(201).json({ data });
  }
}

module.exports = new MaoyantopCtl();
