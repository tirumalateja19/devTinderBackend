const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("Enter all the details");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("FirstName should be between 4-50 characters only");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter correct mail address");
  }
};
const validateProfileEditData = (req) => {
  const validFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "skills",
    "about",
  ];
  const isUpdateAllowed = Object.keys(req.body).every((k) =>
    validFields.includes(k)
  );
  if (!isUpdateAllowed) {
    throw new Error("Update not allowed");
  }
};
module.exports = {
  validateSignUpData,
  validateProfileEditData,
};
