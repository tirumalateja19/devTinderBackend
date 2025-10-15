const jwt = require("jsonwebtoken");
const User = require("../models/users");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token not found");
    }
    const decode = await jwt.verify(token, "DevZone19");
    const { _id } = decode;
    const user = await User.findById(_id);
    if (!_id) {
      throw new Error("User not found");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(400).send("Error ->" + err.message);
  }
};

module.exports = {
  userAuth,
};
