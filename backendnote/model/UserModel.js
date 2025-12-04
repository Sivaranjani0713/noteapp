const mongoose = require("mongoose");
const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const Usermodel = mongoose.model("AccountUser", userschema);
module.exports = Usermodel;
