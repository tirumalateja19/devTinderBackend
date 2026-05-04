const mongoose = require("mongoose");
require("dotenv").config();
// const { DB_URL } = require("./constants");
const DB_URL = process.env.DB_URL;
const connectDB = async () => {
  await mongoose.connect(DB_URL);
};
module.exports = connectDB;
