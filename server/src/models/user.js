const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const usersSchema = new Schema(
  {
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    auth: { type: Number, required: false, default: 0 },
  },
  { timestamps: true },
);

module.exports = model('Users', usersSchema);
