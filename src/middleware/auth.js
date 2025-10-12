const studentAuth = (req, res, next) => {
  console.log("middleware checking student auth");
  const token = "teja";
  const isAuthorized = token === "teja";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  console.log("middleware checking user auth");
  const token = "teja1";
  const isAuthorized = token === "teja";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = {
  studentAuth,
  userAuth,
};
