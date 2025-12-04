const express = require("express");
const jwtVerify = require("../middleware/jwtVerify");
const {
  createNotes,
  getallNotes,
  readbyId,
  editNotes,
  deleteNotes,
} = require("../controller/NotesController");
const route = express.Router();
route.post("/create", jwtVerify, createNotes);
route.get("/get", jwtVerify, getallNotes);
route.get("/read/:id", jwtVerify, readbyId);
route.put("/update/:id", jwtVerify, editNotes);
route.delete("/delete/:id", jwtVerify, deleteNotes);
module.exports = route;
