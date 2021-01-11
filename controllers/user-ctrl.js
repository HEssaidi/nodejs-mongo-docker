const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const validator = require("validator");

createUser = async (req, res) => {
  try {
    let { email, password, nom, prenom } = req.body;

    if (!validator.isEmail(email)) {
      res.json(-2);
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.json(-1);
    }
    let salt = await bcryptjs.genSalt(10);
    password = await bcryptjs.hash(password, salt);
    user = new User({
      email,
      password,
      nom,
      prenom,
    });

    await user.save();

    res.json(1);
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!validator.isEmail(email)) {
      res.json("problem with your email");
    }

    if (!user) {
      return res.json({
        success: 0,
        message: "password or email not correct",
      });
    }

    let isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (isPasswordMatch) {
      return res.json({
        success: 1,
        message: "user is logged in",
        user: user
      });
    } else {
      return res.json({
        success: -1,
        message: "Verify your email !!",
      });
    }
  } catch (error) { }
};

module.exports = {
  createUser,
  loginUser,
};
