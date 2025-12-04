const express = require("express");
const {
  createUserRegister,
  createUserLogin,
  profileUser,
  userLogout,
  checkLogin,
} = require("../controller/Controller");
const { VerifyToken } = require("../middleware/jwtVerify");
const routes = express.Router();

routes.post("/register", createUserRegister);
routes.post("/login-account", createUserLogin);
routes.get("/profile", profileUser);
routes.post("/logout", userLogout);
routes.get("/check-auth", checkLogin);
module.exports = routes;

// getUserAccount,
// deleteUserAccount,
// routes.get("/get-account", VerifyToken, getUserAccount);
// routes.delete("/delete-account,", VerifyToken, deleteUserAccount);
