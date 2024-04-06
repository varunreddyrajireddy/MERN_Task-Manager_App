const express = require("express");
const router = express.Router();
const { registerUser, userLogin } = require("../controllers/userController");

//User Registration Route
router.route("/register").post(registerUser);

//User Login Route
router.route("/login").post(userLogin);

module.exports = router;
