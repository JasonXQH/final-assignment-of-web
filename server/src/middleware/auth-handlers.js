const User = require('../models/user');
const jwt = require('jsonwebtoken');
var config = require('../../config');

async function authAdmin(req, res, next) {
  if(req.user.name !== 'admin') {
    return res.status(500).send('no authority ')
  }
  next()
}

module.exports = {
  authAdmin,
};
