const express = require("express");
const { PORT } = require("./config/constants");
const connectDB = require("./config/database");
const User = require("./models/users");
const app = express();

//express.json() converts the req json-object to Js-object
app.use(express.json());

//create user
app.post("/signup", async (req, res) => {
  //creating new instance of the User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("Data saved successfully");
  } catch (err) {
    res.status(400).send("Data failed to insert" + err.message);
  }
});
//get user
app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  try {
    const data = await User.findOne({ emailId: email });
    res.send(data);
  } catch (err) {
    res.status(400).send("Data failed to insert" + err.message);
  }
});

//update user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const items = req.body;

  try {
    const updateValidFields = [
      "password",
      "about",
      "skills",
      "photoUrl",
      "gender",
    ];
    const isUpdateAllowed = Object.keys(items).every((k) =>
      updateValidFields.includes(k)
    );
    if (items?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    await User.findByIdAndUpdate(userId, items, {
      runValidators: true,
    });
    res.send("updated successfully");
  } catch (err) {
    res.status(400).send("Data failed to insert - " + err.message);
  }
});

//delete user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete({ _id: userId });
    res.send("Deleted successfully");
  } catch (err) {
    res.status(400).send("Data failed to delete" + err.message);
  }
});
//get all users
app.get("/feed", async (req, res) => {
  try {
    const data = await User.find({});
    res.send(data);
  } catch (err) {
    res.status(400).send("Data failed to insert" + err.message);
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
