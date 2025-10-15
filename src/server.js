const express = require("express");
const { PORT } = require("./config/constants");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/users");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());

//create user
app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("Data saved successfully");
  } catch (err) {
    res.status(400).send("Error -> " + err.message);
  }
});

//login user
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      res.clearCookie("token");
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "DevZone19", {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 3600000),
      });
      res.send("Login successfull!!!");
    } else {
      res.clearCookie("token");
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(401).send("Error ->" + err.message);
  }
});

//get profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error ->" + err.message);
  }
});

app.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    res.send("connection request sent...");
  } catch (err) {
    res.status(400).send("Error ", +err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection established successfully...");
    app.listen(PORT, () => {
      console.log("Server is successfully running at port:", PORT);
    });
  })
  .catch((err) => {
    console.log("Database connection failed!!", err.message);
  });
