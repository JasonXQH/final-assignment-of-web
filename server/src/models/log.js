// models/log.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
let Log = new Schema({
  line: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("Log", Log);
