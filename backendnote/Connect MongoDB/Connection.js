const mongoose = require("mongoose");
const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = Connection;
