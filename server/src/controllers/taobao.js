const jsonwebtoken = require("jsonwebtoken");
const Taobao = require("../models/taobao");
const { scrects } = require("../../config");
class TaobaoCtl {
  async findAll(req, res) {
    const { per_page = 10 } = req.query;
    const page = Math.max(req.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const total = await Taobao.countDocuments();
    const sort = req.query.sort;
    console.log(sort);
    if (sort === "undefined") {
      const data = await Taobao.find()
        .limit(perPage)
        .skip(page * perPage);
      res.status(201).json({ data, total });
    } else {
      const data = await Taobao.find()
        .sort({ price: sort === "reverse" ? 1 : -1 })
        .limit(perPage)
        .skip(page * perPage);
      res.status(201).json({ data, total });
    }
  }
  async insertMany(req, res) {
    const { data } = req.body;
    await Taobao.insertMany(data);
    res.status(201).json({ data: "success" });
  }
  async getListByKey(req, res) {
    const params = {};
    const { per_page = 10 } = req.query;
    const page = Math.max(req.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const keys = Object.keys(req.query);
    for (let i = 0; i < 2; i++) {
      params[keys[i]] = { $regex: eval(`/${req.query[keys[i]]}/ig`) };
    }

    console.log(params);
    const sort = req.query.sort;

    const totaldata = await Taobao.find(params).sort({
      price: sort === "reverse" ? 1 : -1,
    });
    const data = await Taobao.find(params).sort({
      price: sort === "reverse" ? 1 : -1,
    })
    .limit(perPage)
    .skip(page * perPage);
    const total = Object.getOwnPropertyNames(totaldata).length;
    console.log(total);
    res.status(201).json({ data, total });
  }

  async getListByOr(req, res) {
    const params = {};
    const { per_page = 10 } = req.query;

    const page = Math.max(req.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
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
    const sort = req.query.sort;
    const totaldata = await Taobao.find({ $or: params2 }).sort({
      price: sort === "reverse" ? 1 : -1,
    });
    const data = await Taobao.find({ $or: params2 })
      .sort({
        price: sort === "reverse" ? 1 : -1,
      })
      .limit(perPage)
      .skip(page * perPage);
    const total = Object.getOwnPropertyNames(totaldata).length;
    res.status(201).json({ data, total });
  }
}

module.exports = new TaobaoCtl();
