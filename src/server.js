const express = require("express");
const app = express();
const port = 5656;
const { studentAuth, userAuth } = require("./middleware/auth");

app.use("/student", studentAuth);

app.get("/user/login", userAuth, (req, res) => {
  console.log("login handler");
  res.send("login successfull");
});
app.get("/student/data", (req, res) => {
  console.log("student handler");
  res.send("Data sent successfull");
});
app.get("/student/delete", (req, res) => {
  console.log("Deleting data");
  res.send("Data deleted..");
});

app.listen(port, () => {
  console.log("Server successfully running at port:", port);
});
