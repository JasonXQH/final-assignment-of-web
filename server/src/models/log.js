// models/log.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
let Log = new Schema({
  method: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("Log", Log);
