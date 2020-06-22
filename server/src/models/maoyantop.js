const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const maoyantop100Schema = new Schema(
  {
    __v: { type: Number, select: false },
    actor: { type: String, required: true },
    image: { type: String, required: true },
    index: { type: String, required: true },
    score: { type: String, required: true },
    time: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = model('maoyantop100', maoyantop100Schema);
