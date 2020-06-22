const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const doubantop250Schema = new Schema(
  {
    __v: { type: Number, select: false },
    actor: { type: String, required: true },
    director: { type: String, required: false },
    other_title: { type: String, required: false },
    country: { type: String, required: false },
    sort: { type: String, required: false },
    quote: { type: String, required: false },
    image: { type: String, required: true },
    index: { type: String, required: true },
    score: { type: String, required: true },
    time: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = model('doubantop250', doubantop250Schema);
