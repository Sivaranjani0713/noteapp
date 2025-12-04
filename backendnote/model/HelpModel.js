const mongoose = require("mongoose");
const helpschema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    report: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const HelpModel = mongoose.model("UserReport", helpschema);
module.exports = HelpModel;
