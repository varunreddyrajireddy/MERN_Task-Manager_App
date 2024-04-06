const User = require("../models/userSchema");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");

// User Register Controller
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all the fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser) {
    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    return res.status(400).json({ message: "User registration failed" });
  }
});

// User Login Controller (Placeholder)
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
});

module.exports = { registerUser, userLogin };
