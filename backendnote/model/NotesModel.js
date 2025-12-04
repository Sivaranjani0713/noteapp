const { text } = require("express");
const mongoose = require("mongoose");
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    deadline: { type: Date },
    completed: { type: Boolean, default: false },
    category: { type: String, require: true },
    status: { type: String, require: true },
    owner: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "AccountUser",
    },
  },
  {
    versionKey: false,
    timeseries: true,
  }
);
const NotesModel = mongoose.model("NotesUser", notesSchema);
module.exports = NotesModel;
