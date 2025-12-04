// jwtVerify.js
const jwt = require("jsonwebtoken");
const Usermodel = require("../model/UserModel");

const VerifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token missing. Unauthorized access." });
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Invalid token. Unauthorized access." });
      }

      const user = await Usermodel.findById(decoded.user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = VerifyToken; // ✅ export function directly
