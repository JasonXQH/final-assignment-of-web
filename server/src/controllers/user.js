const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const { scrects } = require('../../config');
class UsersCtl {
  // 登录
  async login(req, res) {
    const user = await User.findOne(req.body);
    if (!user) {
      res.status(404).json({ msg: 'name or password incorrect' });
    }
    const { _id, name } = user;
    const token = jsonwebtoken.sign({ _id, name }, scrects, { expiresIn: '1d' });
    res.status(201).json({ token, name });
  }

  // 注册
  async register(req, res) {
    const { name } = req.body;
    const repeatedUser = await User.findOne({ name });
    if (repeatedUser) {
      return res.status(409).json({ mas: 'user already exist' });
    }
    if (name === 'admin') { 
      req.body.auth = 1;
    }

    const user = await User.create(req.body);
    res.status(201).json({ data: user });
  }
  async getInfo(req, res) {
    res.status(201).json({ data: req.user });
  }
  async findAll(req, res) {
    const data = await User.find();
    console.log(data)
    res.status(201).json({ data });
  }
  async delete(req, res) {
    const result = await User.findByIdAndRemove(req.params.id);
    res.status(201).json({ data: result });
  }
}

module.exports = new UsersCtl();
