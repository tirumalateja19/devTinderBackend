const express = require("express");
const app = express();
const port = 5656;

app.get("/user", (req, res) => {
  //  {{url}}/user?userId=101&name=testing Query routing
  console.log(req.query); //{ userId: '101', name: 'testing' }
  //[Object: null prototype] prefix is just Node telling you the object has no prototype chain
  res.send({ firstName: "Tirumala Teja", lastName: "Jampani" });
});

app.get("/student/:sId/:sRoll", (req, res) => {
  //Dynamic routing we should definetly pass all the params mentioned
  console.log(req.params);
  res.send({ firstName: "Tirumala Teja", lastName: "Jampani" });
});

app.listen(port, () => {
  console.log("Server successfully running at port:", port);
});
