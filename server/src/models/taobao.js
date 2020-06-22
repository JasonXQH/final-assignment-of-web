const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const taobaocoffeeSchema = new Schema(
  {
    __v: { type: Number, select: false },
    deal: { type: String, required: false },
    image: { type: String, required: false },
    location: { type: String, required: false },
    price: { type: String, required: false },
    shop: { type: String, required: false },
    title: { type: String, required: false },
    url: { type: String, required: false },
  },
  { timestamps: true },
);

module.exports = model('taobaocoffee', taobaocoffeeSchema);
