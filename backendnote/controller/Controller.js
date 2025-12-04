const { default: mongoose } = require("mongoose");
const usermodel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.createUserRegister = async (req, res) => {
  console.log("request body", req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const findUser = await usermodel.findOne({ email: email });
    // console.log("User from DB:", findUser);
    if (findUser) {
      return res.status(401).json({
        message: "User already exists",
      });
    }

    const hashPasword = await bcrypt.hash(password, 12);

    const newUser = await usermodel.create({
      name: name,
      email: email,
      password: hashPasword,
      // notes: [],
    });

    const token = jwt.sign({ user_id: newUser._id }, process.env.JWT_KEY, {
      expiresIn: "2d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      })
      .status(201)
      .json({
        message: "Your account created",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
  } catch (error) {
    console.log(error);
  }
};
exports.createUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginUser = await usermodel.findOne({ email: email });
    if (!loginUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    const correct = await bcrypt.compare(password, loginUser.password);
    if (!correct) {
      return res.status(401).json({
        message: "incorrect password",
      });
    }
    const token = jwt.sign({ user_id: loginUser._id }, process.env.JWT_KEY, {
      expiresIn: "2d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      })
      .status(200)
      .json({
        message: "Login successful",
        user: loginUser,
        // token: token,
        // notes: notes,
      });
  } catch (error) {
    console.log(error);
  }
};
exports.profileUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await usermodel.findById(decoded.user_id).select("-password"); // ✅ use decoded.user_id
    if (!user) return res.status(401).json({ message: "User not found" });

    res.json({ message: "Protected data", user }); // user details return pannidum
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.userLogout = async (_req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
exports.checkLogin = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "Not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await usermodel.findById(decoded.user_id).select("-password"); // ✅

    if (!user) return res.status(401).json({ msg: "User not found" });

    res.json({ user, msg: "Active session" });
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

exports.getUserAccount = async (req, res) => {
  try {
    const getuser = await usermodel.find();
    res.status(200).json({
      message: "your account",
      getuser,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteUserAccount = async (req, res) => {
  try {
    const deleteAcoount = await usermodel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message: "Your accouunt was deleted",
      deleteAcoount,
    });
  } catch (error) {
    console.log(error);
  }
};
