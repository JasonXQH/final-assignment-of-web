const jsonwebtoken = require("jsonwebtoken");
const Operas = require("../models/operas");
const OperaCollection = require("../models/operaCollections");
const { scrects } = require("../../config");
class OperasCtl {
  async getOperas(req, res) {
    console.log(req.params);
    const { params } = req;
    const targetOpera = await Operas.find({ title: params.id }).limit(1);
    console.log(targetOpera);
    res.status(201).json({ targetOpera });
  }
  async updateOperas(req, res) {
    console.log(req.params)
    //  Operas.updateMany( 
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //  )
  }
  async create(req, res) {
    const opera = new Operas({
      title: req.body.title,
      actors: req.body.actors,
      country: req.body.country,
      type: req.body.type,
      single: req.body.single,
      first_date: req.body.first_date,
      now: req.bodynow,
      other_name: req.bodyother_name,
      station: req.bodystation,
      url: req.bodyurl,
    });
    const result = await opera.save();
    console.log(result);
    res.status(201).json({ result });
  }
  async addToCollection(req, res) {
    const { body } = req.body;
    const { item } = body;
    const opera = new OperaCollection({
      title: item.title,
      actors: item.actors,
      country: item.country,
      first_date: item.first_date,
      now: item.now,
      other_name: item.other_name,
      single: item.single,
      station: item.station,
      type: item.type,
      url: item.url,
    });

    const result = await opera.save();
    console.log(result);
    res.status(201).json({ result });
  }
  async findAll(req, res) {
    const { per_page = 10 } = req.query;
    const page = Math.max(req.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const total = await Operas.countDocuments();
    const data = await Operas.find()
      .limit(perPage)
      .skip(page * perPage);
    res.status(201).json({ data, total });
  }
  async collectionfindAll(req, res) {
    const { per_page = 10 } = req.query;
    const page = Math.max(req.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const total = await OperaCollection.countDocuments();
    const data = await OperaCollection.find()
      .limit(perPage)
      .skip(page * perPage);
    res.status(201).json({ data, total });
  }
  async insertMany(req, res) {
    const { data } = req.body;
    await Operas.insertMany(data);
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
    const totaldata = await Operas.find(params);
    const data = await Operas.find(params)
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
    const totaldata = await Operas.find({ $or: params2 });

    const data = await Operas.find({ $or: params2 })
      .limit(perPage)
      .skip(page * perPage);
    const total = Object.getOwnPropertyNames(totaldata).length;
    res.status(201).json({ data, total });
  }
  async delete(req, res) {
    const result = await Operas.findByIdAndRemove(req.params.id);
    res.status(201).json({ data: result });
  }
  async deletefromCollection(req, res) {
    const result = await OperaCollection.findByIdAndRemove(req.params.id);
    res.status(201).json({ data: result });
  }
}

module.exports = new OperasCtl();
