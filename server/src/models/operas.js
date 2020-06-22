const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const operasSchema = new Schema(
  {
    __v: { type: Number, select: false },
    actors: { type: String, required: false },
    country: { type: String, required: false },
    first_date: { type: String, required: false },
    now: { type: String, required: false },
    other_name: { type: String, required: false },
    single: { type: String, required: false },
    station: { type: String, required: false },
    title: { type: String, required: false },
    type: { type: String, required: false },
    url: { type: String, required: false },
  },
  { timestamps: true },
);

module.exports = model('operas', operasSchema);
