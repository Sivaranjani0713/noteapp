const express = require("express");
const { createFeedback } = require("../controller/HelpController");

const route = express.Router();
route.post("/feedback", createFeedback);

module.exports = route;
