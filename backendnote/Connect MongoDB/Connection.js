const mongoose = require("mongoose");
const Connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/allUser");
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = Connection;
