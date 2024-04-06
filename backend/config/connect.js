const mongoose = require("mongoose");

//Database connection
const connectDB = (url) => {
  console.log("Connected to database...");
  return mongoose.connect(url);
};

module.exports = connectDB;
