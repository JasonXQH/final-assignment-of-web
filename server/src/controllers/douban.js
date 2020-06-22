const jsonwebtoken = require("jsonwebtoken");
const DouBan = require("../models/douban");
const { scrects } = require("../../config");
class DouBanCtl {
  async findAll(req, res) {
    const { per_page = 10 } = req.query;
    const page = Math.max(req.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const sort = req.query.sort;
    console.log(sort);
    const total = await DouBan.countDocuments();
    if (sort === "undefined") {
      const data = await DouBan.find()
        .limit(perPage)
        .skip(page * perPage);
      res.status(201).json({ data, total });
    } else {
      const data = await DouBan.find()
        .sort({ score: sort === "reverse" ? 1 : -1 })
        .limit(perPage)
        .skip(page * perPage);
      res.status(201).json({ data, total });
    }
  }
  async getAll(req, res) {
    const data = await DouBan.find();
    res.status(201).json({ data });
  }
  async insertMany(req, res) {
    const { data } = req.body;
    await DouBan.insertMany(data);
    res.status(201).json({ data: "success" });
  }
  // 谨慎使用，会清空数据库
  async delete(req, res) {
    const data = await DouBan.findByIdAndRemove(req.params.id);
    res.status(201).json({ data });
  }
  async getListByKey(req, res) {
    const params = {};
    Object.keys(req.query).forEach((item) => {
      params[item] = { $regex: eval(`/${req.query[item]}/ig`) };
    });
    console.log(params);

    const data = await DouBan.find(params);
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
    const data = await DouBan.find({ $or: params2 });
    res.status(201).json({ data });
  }
}

module.exports = new DouBanCtl();
