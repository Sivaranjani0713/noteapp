const express = require("express");
const helpfeedback = require("./Route/HelpRoute");
const Notesrouter = require("./Route/NotesRoute");
const Userroute = require("./Route/Userroute");
const Connection = require("./Connect MongoDB/Connection");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParse = require("cookie-parser");

Connection();
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());

app.use("/api/usernotes", Notesrouter);
app.use("/api/useraccount", Userroute);
app.use("/api/userfeedback", helpfeedback);
app.listen(process.env.PORT, () => {
  console.log("server is running");
});
// console.log(process.env.JWT_KEY);
